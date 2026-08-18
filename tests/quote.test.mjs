import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestPost } from '../functions/api/quote.js';

const baseEnv = {
  ALLOWED_ORIGIN: 'https://www.artilingstudio.co.uk',
  TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
  RESEND_API_KEY: 'test-resend-key',
  QUOTE_TO_EMAIL: 'info@artilingstudio.co.uk',
  QUOTE_FROM_EMAIL: 'Artiling Studio <quotes@artilingstudio.co.uk>',
};

const makeForm = (descriptionField = 'projectMessage') => {
  const form = new FormData();
  form.set('projectType', 'Bespoke porcelain sink');
  form.set(descriptionField, 'Diagnostic quote API test.');
  form.set('location', 'London');
  form.set('dimensions', '1200 x 450mm');
  form.set('name', 'Quote API Test');
  form.set('email', 'diagnostic@example.com');
  form.set('consent', 'on');
  form.set('cf-turnstile-response', 'test-turnstile-token');
  return form;
};

const submit = async ({
  form = makeForm(),
  env = baseEnv,
  resendStatus = 200,
} = {}) => {
  const originalFetch = globalThis.fetch;
  let emailPayload = null;

  globalThis.fetch = async (url, options) => {
    if (String(url).includes('/siteverify')) {
      return Response.json({ success: true });
    }
    if (String(url) === 'https://api.resend.com/emails') {
      emailPayload = JSON.parse(options.body);
      return Response.json(
        resendStatus === 200 ? { id: 'test-email-id' } : { message: 'test failure' },
        { status: resendStatus },
      );
    }
    throw new Error(`Unexpected fetch URL: ${url}`);
  };

  try {
    const request = new Request('https://www.artilingstudio.co.uk/api/quote', {
      method: 'POST',
      headers: { Origin: 'https://www.artilingstudio.co.uk' },
      body: form,
    });
    const response = await onRequestPost({ request, env });
    return { response, body: await response.json(), emailPayload };
  } finally {
    globalThis.fetch = originalFetch;
  }
};

test('quote API contract and error classification', async (t) => {
  await t.test('sends the canonical project message to configured Artiling addresses', async () => {
    const result = await submit();

    assert.equal(result.response.status, 200);
    assert.equal(result.body.code, 'QUOTE_SENT');
    assert.deepEqual(result.emailPayload.to, [baseEnv.QUOTE_TO_EMAIL]);
    assert.equal(result.emailPayload.from, baseEnv.QUOTE_FROM_EMAIL);
    assert.match(result.emailPayload.text, /Project message: Diagnostic quote API test\./);
    assert.match(result.emailPayload.text, /Location: London/);
    assert.match(result.emailPayload.text, /Dimensions: 1200 x 450mm/);
  });

  await t.test('accepts the legacy briefDescription field for cached clients', async () => {
    const result = await submit({ form: makeForm('briefDescription') });

    assert.equal(result.response.status, 200);
    assert.equal(result.body.code, 'QUOTE_SENT');
    assert.match(result.emailPayload.text, /Project message: Diagnostic quote API test\./);
  });

  await t.test('returns a validation code for a missing project message', async () => {
    const form = makeForm();
    form.delete('projectMessage');
    const result = await submit({ form });

    assert.equal(result.response.status, 400);
    assert.equal(result.body.code, 'VALIDATION_ERROR');
  });

  await t.test('returns an email delivery failure for a rejected Resend request', async () => {
    const result = await submit({ resendStatus: 422 });

    assert.equal(result.response.status, 502);
    assert.equal(result.body.code, 'EMAIL_DELIVERY_FAILED');
    assert.doesNotMatch(result.body.message, /required fields/i);
  });

  await t.test('requires the configured quote recipient', async () => {
    const env = { ...baseEnv };
    delete env.QUOTE_TO_EMAIL;
    const result = await submit({ env });

    assert.equal(result.response.status, 500);
    assert.equal(result.body.code, 'EMAIL_CONFIGURATION_ERROR');
  });
});
