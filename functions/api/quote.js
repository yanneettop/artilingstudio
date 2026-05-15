const REQUIRED_FIELDS = [
  'projectType',
  'materialSituation',
  'scope',
  'condition',
  'timeline',
  'budget',
  'name',
  'email',
  'consent',
];

const FIELD_LABELS = [
  ['projectType', 'Project type'],
  ['materialSituation', 'Material situation'],
  ['scope', 'Scope'],
  ['condition', 'Current condition'],
  ['dimWidth', 'Width (cm)'],
  ['dimHeight', 'Height (cm)'],
  ['dimDepth', 'Depth (cm)'],
  ['dimArea', 'Area (m2)'],
  ['dimNotes', 'Notes on the space'],
  ['sinkLength', 'Sink length (cm)'],
  ['sinkDepth', 'Sink depth (cm)'],
  ['sinkHeight', 'Sink height (cm)'],
  ['basin', 'Basin configuration'],
  ['mounting', 'Mounting'],
  ['drawers', 'Drawers'],
  ['tapPosition', 'Tap position'],
  ['finishPreference', 'Finish preference'],
  ['timeline', 'Timeline'],
  ['postcode', 'Postcode'],
  ['area', 'Area / borough'],
  ['parking', 'Parking'],
  ['floor', 'Floor level'],
  ['lift', 'Lift access'],
  ['budget', 'Budget'],
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone or WhatsApp'],
  ['contactMethod', 'Preferred contact method'],
  ['bestTime', 'Best time to contact'],
  ['consent', 'Consent'],
];

const MAX_FILES = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
]);

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

const asString = (value) => (typeof value === 'string' ? value.trim() : '');

const escapeHtml = (value) =>
  String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

const isFileLike = (value) =>
  value &&
  typeof value === 'object' &&
  typeof value.arrayBuffer === 'function' &&
  typeof value.name === 'string';

const sanitizeFilename = (filename) => {
  const fallback = 'upload';
  const cleaned = String(filename || fallback)
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
  return cleaned || fallback;
};

const isAllowedPhoto = (file) => {
  const type = String(file.type || '').toLowerCase();
  const name = String(file.name || '').toLowerCase();
  return ALLOWED_IMAGE_TYPES.has(type) || (!type && /\.(heic|heif)$/.test(name));
};

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

const collectFields = (formData) => {
  const fields = {};
  FIELD_LABELS.forEach(([name]) => {
    fields[name] = asString(formData.get(name));
  });
  return fields;
};

const verifyOrigin = (request, env) => {
  const allowedOrigin = asString(env.ALLOWED_ORIGIN);
  if (!allowedOrigin) return true;

  const origin = request.headers.get('Origin');
  if (!origin) return true;

  return origin === allowedOrigin;
};

const verifyTurnstile = async (request, env, token) => {
  if (!env.TURNSTILE_SECRET_KEY) {
    throw new Error('Turnstile secret is not configured.');
  }

  const body = new URLSearchParams();
  body.set('secret', env.TURNSTILE_SECRET_KEY);
  body.set('response', token);

  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) body.set('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });

  if (!response.ok) return false;

  const result = await response.json();
  return !!result.success;
};

const uploadPhotos = async ({ env, photos, submissionId, submittedEmail }) => {
  if (!photos.length) return [];

  if (!env.QUOTE_UPLOADS) {
    throw new Error('R2 upload binding is not configured.');
  }

  const date = new Date().toISOString().slice(0, 10);
  const uploads = [];

  for (const file of photos) {
    const safeName = sanitizeFilename(file.name);
    const key = `quotes/artiling/${date}/${submissionId}/${safeName}`;

    await env.QUOTE_UPLOADS.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type || 'application/octet-stream',
      },
      customMetadata: {
        originalFilename: String(file.name || ''),
        contentType: String(file.type || ''),
        submittedEmail: submittedEmail || '',
      },
    });

    uploads.push({
      key,
      filename: file.name,
      size: file.size,
      contentType: file.type || '',
    });
  }

  return uploads;
};

const buildUploadLink = (baseUrl, key) => {
  if (!baseUrl) return '';
  const base = baseUrl.replace(/\/+$/, '');
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return `${base}/${encodedKey}`;
};

const buildEmail = ({ fields, submissionId, uploads, publicBaseUrl }) => {
  const fieldLines = FIELD_LABELS.map(([name, label]) => {
    const value = fields[name] || '-';
    return `${label}: ${value}`;
  });

  const uploadLines = uploads.length
    ? uploads.map((upload) => {
      const link = buildUploadLink(publicBaseUrl, upload.key);
      return link
        ? `${upload.filename} (${upload.contentType || 'unknown'}, ${upload.size} bytes)\n${upload.key}\n${link}`
        : `${upload.filename} (${upload.contentType || 'unknown'}, ${upload.size} bytes)\n${upload.key}`;
    })
    : ['No photos uploaded.'];

  const text = [
    'New Quote Request - Artiling Studio',
    '',
    `Submission ID: ${submissionId}`,
    '',
    'Quote details:',
    ...fieldLines,
    '',
    'Uploads:',
    ...uploadLines,
  ].join('\n');

  const htmlFields = FIELD_LABELS.map(([name, label]) => `
    <tr>
      <th align="left" style="padding:6px 12px 6px 0;vertical-align:top;">${escapeHtml(label)}</th>
      <td style="padding:6px 0;vertical-align:top;">${escapeHtml(fields[name] || '-')}</td>
    </tr>
  `).join('');

  const htmlUploads = uploads.length
    ? uploads.map((upload) => {
      const link = buildUploadLink(publicBaseUrl, upload.key);
      const label = `${upload.filename} (${upload.contentType || 'unknown'}, ${upload.size} bytes)`;
      return `
        <li>
          <strong>${escapeHtml(label)}</strong><br>
          <code>${escapeHtml(upload.key)}</code>
          ${link ? `<br><a href="${escapeHtml(link)}">${escapeHtml(link)}</a>` : ''}
        </li>
      `;
    }).join('')
    : '<li>No photos uploaded.</li>';

  const html = `
    <h1>New Quote Request - Artiling Studio</h1>
    <p><strong>Submission ID:</strong> ${escapeHtml(submissionId)}</p>
    <h2>Quote details</h2>
    <table cellpadding="0" cellspacing="0" border="0">${htmlFields}</table>
    <h2>Uploads</h2>
    <ul>${htmlUploads}</ul>
  `;

  return { text, html };
};

const sendEmail = async ({ env, fields, submissionId, uploads }) => {
  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL || !env.QUOTE_FROM_EMAIL) {
    throw new Error('Resend email settings are not configured.');
  }

  const { text, html } = buildEmail({
    fields,
    submissionId,
    uploads,
    publicBaseUrl: asString(env.R2_PUBLIC_BASE_URL),
  });

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.QUOTE_FROM_EMAIL,
      to: [env.QUOTE_TO_EMAIL],
      subject: 'New Quote Request - Artiling Studio',
      text,
      html,
      reply_to: fields.email || undefined,
    }),
  });

  if (!response.ok) {
    throw new Error('Email delivery failed.');
  }
};

export async function onRequestPost({ request, env }) {
  try {
    if (!verifyOrigin(request, env)) {
      return jsonResponse({
        ok: false,
        message: 'This quote request could not be accepted from this origin.',
      }, 403);
    }

    const formData = await request.formData();
    const fields = collectFields(formData);
    const turnstileToken = asString(formData.get('cf-turnstile-response'));

    if (!turnstileToken) {
      return jsonResponse({
        ok: false,
        message: 'Please complete the spam check and try again.',
      }, 400);
    }

    const turnstileOk = await verifyTurnstile(request, env, turnstileToken);
    if (!turnstileOk) {
      return jsonResponse({
        ok: false,
        message: 'The spam check could not be verified. Please try again.',
      }, 400);
    }

    const missing = REQUIRED_FIELDS.filter((name) => !fields[name]);
    if (missing.length) {
      return jsonResponse({
        ok: false,
        message: 'Please complete all required fields before sending your request.',
      }, 400);
    }

    if (!validateEmail(fields.email)) {
      return jsonResponse({
        ok: false,
        message: 'Please enter a valid email address.',
      }, 400);
    }

    const photos = formData.getAll('photos').filter(isFileLike);
    if (photos.length > MAX_FILES) {
      return jsonResponse({
        ok: false,
        message: `Please upload no more than ${MAX_FILES} photos.`,
      }, 400);
    }

    for (const photo of photos) {
      if (!isAllowedPhoto(photo)) {
        return jsonResponse({
          ok: false,
          message: 'Please upload JPG, PNG, WebP or HEIC images only.',
        }, 400);
      }
      if (photo.size > MAX_FILE_SIZE) {
        return jsonResponse({
          ok: false,
          message: 'Each uploaded image must be 10MB or smaller.',
        }, 400);
      }
    }

    const submissionId = crypto.randomUUID();
    const uploads = await uploadPhotos({
      env,
      photos,
      submissionId,
      submittedEmail: fields.email,
    });

    await sendEmail({
      env,
      fields,
      submissionId,
      uploads,
    });

    return jsonResponse({
      ok: true,
      message: 'Quote request sent successfully.',
    });
  } catch (error) {
    console.error('Quote request failed:', error.message);
    return jsonResponse({
      ok: false,
      message: 'Sorry, something went wrong while sending your request. Please email info@artilingstudio.co.uk directly.',
    }, 500);
  }
}
