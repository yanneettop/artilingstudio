import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

type LinkItem = {
  label: string;
  href: string;
  variant?: "dark" | "stone";
};

type HeroAction = LinkItem & {
  tone?: "solid" | "soft";
};

const heroActions: HeroAction[] = [
  { label: "Request a Quote", href: "/quote/", tone: "solid" },
  { label: "Website", href: "https://www.artilingstudio.co.uk/", tone: "soft" },
];

const linkItems: LinkItem[] = [
  { label: "Phone Call", href: "tel:+447481613339", variant: "dark" },
  { label: "WhatsApp", href: "https://wa.me/447481613339", variant: "dark" },
  { label: "Email", href: "mailto:info@artilingstudio.co.uk?subject=Artiling%20Studio%20Enquiry", variant: "dark" },
];

function HeroButton({ label, href, tone = "solid" }: HeroAction) {
  return (
    <a
      href={href}
      className={[
        "group flex h-[60px] w-full items-center justify-center rounded-2xl px-5 text-[15px] font-semibold tracking-[0.01em] text-charcoal shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-porcelain-50",
        tone === "soft" ? "bg-porcelain-50/95 hover:bg-white" : "bg-porcelain-50 hover:bg-white",
      ].join(" ")}
    >
      {label}
    </a>
  );
}

function LinkButton({ label, href, variant = "stone" }: LinkItem) {
  const isDark = variant === "dark";

  return (
    <a
      href={href}
      className={[
        "flex min-h-[58px] w-full items-center justify-center rounded-2xl px-5 text-center text-[15px] font-semibold tracking-[0.01em] shadow-[0_10px_28px_rgba(29,27,24,0.055)] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal sm:min-h-[62px]",
        isDark
          ? "bg-charcoal text-porcelain-50 hover:-translate-y-0.5 hover:bg-[#27231f]"
          : "bg-[#eee7db] text-charcoal hover:-translate-y-0.5 hover:bg-[#f3ece2]",
      ].join(" ")}
    >
      {label}
    </a>
  );
}

function HeroCard() {
  return (
    <section
      className="relative isolate flex min-h-[620px] overflow-hidden rounded-[30px] bg-charcoal p-7 shadow-card sm:p-8"
      aria-label="Artiling Studio introduction"
    >
      <img
        src="/assets/images/hero3.webp"
        alt="Warm minimal bathroom with custom double porcelain sink and stone surfaces"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.28),rgba(0,0,0,0.2)_46%,rgba(0,0,0,0.58))]" />
      <div className="absolute inset-0 bg-[#2a211b]/18 mix-blend-multiply" />

      <div className="relative z-10 flex min-h-[566px] w-full flex-col text-center text-porcelain-50 sm:min-h-[556px]">
        <header className="flex items-center justify-center gap-4 pt-1 text-left">
          <img
            src="/assets/images/artiling_logo.webp"
            alt="Artiling Studio logo"
            className="h-16 w-16 shrink-0 object-contain opacity-95 brightness-0 invert drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)] sm:h-[95px] sm:w-[95px]"
          />
          <div>
            <p className="font-serif text-[25px] font-medium leading-none tracking-[0.04em] text-[#fffaf0] sm:text-[28px]">
              Artiling Studio
            </p>
            <p className="mt-2 max-w-[15rem] text-[9px] font-semibold uppercase leading-4 tracking-[0.16em] text-white/85 sm:max-w-[20rem] sm:text-[11px]">
              Bespoke Porcelain Sinks & Tiling <span aria-hidden="true">{"\u00b7"}</span> London
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-center pb-10 pt-12 sm:pb-12 sm:pt-14">
          <h1 className="mx-auto max-w-[305px] text-balance font-serif text-[clamp(33px,8.6vw,39px)] font-medium leading-[1.12] text-[#fffaf0] sm:max-w-[360px] sm:text-[46px]">
            Bespoke porcelain surfaces for refined interiors.
          </h1>
          <p className="mx-auto mt-7 max-w-[320px] text-balance text-[15px] leading-[1.55] text-white/90 sm:max-w-[350px] sm:text-base">
            Custom sinks, vanity tops and large-format finishes, crafted for London homes.
          </p>
        </div>

        <div className="grid gap-3.5" aria-label="Primary actions">
          {heroActions.map((item) => (
            <HeroButton key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailCard() {
  return (
    <section className="rounded-[22px] border border-charcoal/10 bg-[#f3ede4]/70 px-6 py-7 text-center shadow-[0_14px_42px_rgba(29,27,24,0.055)]">
      <p className="mx-auto max-w-[18rem] font-serif text-[23px] leading-[1.12] text-charcoal">
        Specialist in custom porcelain work
      </p>
      <p className="mx-auto mt-3 max-w-[18rem] text-[10px] font-semibold uppercase leading-5 tracking-[0.12em] text-porcelain-700">
        Sinks <span aria-hidden="true">{"\u00b7"}</span> vanity tops
        <br />
        Large-format tiling <span aria-hidden="true">{"\u00b7"}</span> wet rooms
      </p>
    </section>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-porcelain-100 px-4 py-6 text-charcoal sm:px-6 sm:py-10">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.86),transparent_30rem),radial-gradient(circle_at_90%_12%,rgba(210,195,174,0.30),transparent_28rem)]" />
      <div className="pointer-events-none fixed inset-0 -z-0 opacity-[0.16] [background-image:linear-gradient(115deg,transparent_0%,rgba(83,75,66,0.18)_48%,transparent_51%),linear-gradient(70deg,transparent_0%,rgba(255,255,255,0.7)_54%,transparent_56%)] [background-size:220px_220px,320px_320px]" />

      <div className="relative z-10 mx-auto w-full max-w-[520px]">
        <HeroCard />

        <nav className="mt-5 grid gap-3" aria-label="Artiling Studio links">
          {linkItems.map((item) => (
            <LinkButton key={item.label} {...item} />
          ))}
        </nav>

        <div className="mt-6">
          <DetailCard />
        </div>

        <footer className="px-4 pb-3 pt-8 text-center">
          <p className="font-serif text-2xl leading-none text-charcoal/90">Artiling Studio</p>
          <p className="mt-3 text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-porcelain-700">
            Bespoke porcelain sinks & tiling <span aria-hidden="true">{"\u00b7"}</span> London
          </p>
        </footer>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
