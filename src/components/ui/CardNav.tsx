import "@/styles/CardNav.css";
import {
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

export interface CardNavLink {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
  download?: boolean;
}

export interface CardNavItem {
  label: string;
  description?: string;
  links: CardNavLink[];
  mobileOnly?: boolean;
}

export interface CardNavProps {
  brand: string;
  brandHref: string;
  items: CardNavItem[];
  links?: CardNavLink[];
  logo?: ReactNode;
  actions?: ReactNode;
  menuText?: string;
  closeText?: string;
  ariaLabel?: string;
  cardEffect?: "rise" | "unfold" | "fade";
  stagger?: number;
  bounce?: number;
  speed?: number;
  cardHeight?: number;
  intro?: boolean;
  className?: string;
}

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const easeOut = (t: number) => 1 - (1 - t) ** 3;

const ArrowIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    className="card-nav__download-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 15V3" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
  </svg>
);

const CardNav = ({
  brand,
  brandHref,
  items,
  links = [],
  logo,
  actions,
  menuText = "Menu",
  closeText = "Close",
  ariaLabel = "Main",
  cardEffect = "rise",
  stagger = 0.12,
  bounce = 0.2,
  speed = 1,
  cardHeight = 160,
  intro = true,
  className = "",
}: CardNavProps) => {
  const contentId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<{ wake: () => void; refresh: () => void } | null>(
    null,
  );
  const introRef = useRef(intro);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  const settings = {
    open,
    cardEffect,
    stagger: clamp(stagger, 0, 0.3),
    bounce: clamp(bounce, 0, 1),
    speed: clamp(speed, 0.2, 3),
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!panel || !content) return undefined;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const state = {
      p: settingsRef.current.open ? 1 : 0,
      v: 0,
      height: content.offsetHeight,
      bar: 56,
    };
    let raf = 0;
    let last = 0;

    const render = () => {
      const s = settingsRef.current;
      state.bar =
        parseFloat(getComputedStyle(panel).getPropertyValue("--cn-bar")) || 56;
      panel.style.height = `${state.bar + Math.max(0, state.p) * state.height}px`;
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement =>
          card !== null && card.getClientRects().length > 0,
      );
      const count = cards.length;
      const lag = count > 1 ? Math.min(s.stagger, 0.7 / (count - 1)) : 0;
      const span = 1 - lag * (count - 1);
      cards.forEach((card, index) => {
        const local = clamp(
          (state.p - index * lag) / Math.max(span, 0.05),
          0,
          1,
        );
        const e = easeOut(local);
        if (s.cardEffect === "unfold") {
          card.style.transform = `translateY(${(1 - e) * -10}px) rotateX(${(1 - e) * -72}deg)`;
          card.style.opacity = `${clamp(local * 1.8, 0, 1)}`;
          card.style.filter = "";
        } else if (s.cardEffect === "fade") {
          card.style.transform = `translateY(${(1 - e) * 6}px)`;
          card.style.opacity = `${e}`;
          card.style.filter = e < 0.999 ? `blur(${(1 - e) * 6}px)` : "";
        } else {
          card.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.97 + 0.03 * e})`;
          card.style.opacity = `${e}`;
          card.style.filter = "";
        }
      });
    };

    const tick = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const target = s.open ? 1 : 0;
      if (reduce) {
        state.p = target;
        state.v = 0;
      } else {
        const k = 160 * s.speed * s.speed;
        const zeta = s.open ? 1 - 0.68 * s.bounce : 1;
        const steps = Math.ceil(dt / (1 / 240));
        const h = dt / steps;
        for (let i = 0; i < steps; i++) {
          state.v +=
            (-k * (state.p - target) - 2 * zeta * Math.sqrt(k) * state.v) * h;
          state.p += state.v * h;
        }
      }
      const done =
        Math.abs(state.p - target) < 0.0005 && Math.abs(state.v) < 0.002;
      if (done) {
        state.p = target;
        state.v = 0;
      }
      render();
      if (done && target === 0) setShown(false);
      if (!done) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    engineRef.current = {
      wake,
      refresh: () => {
        state.height = content.offsetHeight;
        render();
      },
    };

    render();
    const observer = new ResizeObserver(() => {
      state.height = content.offsetHeight;
      render();
    });
    observer.observe(content);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      engineRef.current = null;
    };
  }, [items.length]);

  useLayoutEffect(() => {
    if (open) setShown(true);
    engineRef.current?.refresh();
    engineRef.current?.wake();
  }, [open]);

  useEffect(() => {
    engineRef.current?.refresh();
  });

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const bar = barRef.current;
    if (!panel || !bar || !introRef.current) return;
    introRef.current = false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const radius =
      parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 28;
    panel.animate(
      [
        {
          clipPath: `inset(0px ${Math.max(0, (width - height) / 2)}px round ${height / 2}px)`,
          opacity: 0,
        },
        { clipPath: `inset(0px 0px round ${radius}px)`, opacity: 1 },
      ],
      { duration: 820, easing: EASE_OUT, fill: "backwards" },
    );
    Array.from(bar.children).forEach((child, index) => {
      child.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 560,
          delay: 220 + index * 70,
          easing: EASE_OUT,
          fill: "backwards",
        },
      );
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className={["card-nav", className].filter(Boolean).join(" ")}
      data-open={open ? "" : undefined}
      data-shown={shown || open ? "" : undefined}
      style={{ "--cn-card": `${cardHeight}px` } as CSSProperties}
    >
      <nav ref={panelRef} className="card-nav__panel" aria-label={ariaLabel}>
        <div ref={barRef} className="card-nav__bar">
          <button
            ref={menuRef}
            type="button"
            className="card-nav__menu"
            aria-expanded={open}
            aria-controls={contentId}
            aria-label={open ? closeText : menuText}
            onClick={() => setOpen(!open)}
          >
            <span className="card-nav__burger" aria-hidden="true">
              <span className="card-nav__line card-nav__line--top" />
              <span className="card-nav__line card-nav__line--bottom" />
            </span>
          </button>

          <a
            href={brandHref}
            className="card-nav__logo"
            aria-label={logo ? brand : undefined}
          >
            {logo ?? brand}
          </a>

          {links.length > 0 && (
            <ul className="card-nav__inline-links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="card-nav__inline-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {actions && <div className="card-nav__actions">{actions}</div>}
        </div>

        <div
          ref={contentRef}
          id={contentId}
          className="card-nav__content"
          aria-hidden={!open}
        >
          <div className="card-nav__cards">
            {items.map((item, index) => (
              <div
                key={item.label}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={
                  item.mobileOnly
                    ? "card-nav__card card-nav__card--mobile"
                    : "card-nav__card"
                }
              >
                <div className="card-nav__card-head">
                  <span className="card-nav__label">{item.label}</span>
                  {item.description && (
                    <p className="card-nav__description">{item.description}</p>
                  )}
                </div>
                <ul className="card-nav__links">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="card-nav__link"
                        aria-label={link.ariaLabel}
                        tabIndex={open ? undefined : -1}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        download={link.download || undefined}
                        onClick={() => setOpen(false)}
                      >
                        <span className="card-nav__arrow" aria-hidden="true">
                          {link.download ? (
                            <DownloadIcon />
                          ) : (
                            <>
                              <ArrowIcon className="card-nav__arrow-icon card-nav__arrow-icon--out" />
                              <ArrowIcon className="card-nav__arrow-icon card-nav__arrow-icon--in" />
                            </>
                          )}
                        </span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <span className="card-nav__rim" />
      </nav>
    </div>
  );
};

export default CardNav;
