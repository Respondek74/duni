/**
 * DUNI Produkt-Konfigurator – React Component
 * Design System: duni-design-system.json
 *
 * Tokens:
 *  - Primary: #181818 (Black), #FFFFFF (White)
 *  - Accent: #27809B (Teal)
 *  - Typography: AzoSans / Open Sans, weights 300–500
 *  - Borders: sharp (0px radius), buttons: pill (56px)
 *  - Shadows: minimal (flat, clean)
 *  - Uppercase: buttons & nav labels
 */

import { useState } from "react";

// ═══ Design Tokens ═══
const T = {
  black: "#181818",
  white: "#FFFFFF",
  teal: "#27809B",
  tealHover: "#1a5a6d",
  success: "#5A9B27",
  danger: "#C40E0E",
  warning: "#F0AD4E",
  n900: "#181818",
  n800: "#282828",
  n700: "#444444",
  n500: "#777777",
  n300: "#CCCCCC",
  n200: "#E5E5E5",
  n100: "#F5F5F5",
  n50: "#FAFAFA",
  n0: "#FFFFFF",
  font: '"Open Sans", Helvetica, Arial, sans-serif',
  pill: "56px",
  sharp: "0px",
};

// ═══ Product Catalog ═══
const CATEGORIES = [
  {
    id: "napkins", name: "Servietten", en: "Napkins",
    products: [
      {
        id: "elegance-lily", name: "Duni Elegance® Napkin Lily", mat: "Dunilin®",
        sizes: ["33 x 33 cm", "40 x 40 cm", "48 x 48 cm"],
        packs: ["40 (10×4)", "240 (6×40)", "480 (12×40)"],
        colors: [
          { n: "Weiß", h: "#FFFFFF", l: 1 }, { n: "Schwarz", h: "#181818" },
          { n: "Creme", h: "#F5F0E1", l: 1 }, { n: "Bordeaux", h: "#800020" },
          { n: "Rot", h: "#CC0000" }, { n: "Dunkelblau", h: "#1A237E" },
          { n: "Plum", h: "#7B1FA2" }, { n: "Granite Grey", h: "#9E9E9E" },
          { n: "Herbal Green", h: "#2E7D32" }, { n: "Brilliance Gold", h: "#C9A96E" },
        ],
        price: 66.82, t: "napkin", certs: ["FSC®", "OK Compost"], cust: true,
      },
      {
        id: "dunisoft", name: "Dunisoft® Serviette Uni", mat: "Dunisoft® (Airlaid)",
        sizes: ["20 x 20 cm", "40 x 40 cm"],
        packs: ["60 (12×5)", "180 (6×30)", "720 (12×60)"],
        colors: [
          { n: "Weiß", h: "#FFFFFF", l: 1 }, { n: "Schwarz", h: "#181818" },
          { n: "Mint Blue", h: "#A8D8EA", l: 1 }, { n: "Kiwi", h: "#8BC34A" },
          { n: "Mandarin", h: "#FF9800" }, { n: "Rot", h: "#CC0000" },
          { n: "Plum", h: "#7B1FA2" }, { n: "Granite Grey", h: "#9E9E9E" },
        ],
        price: 42.5, t: "napkin", certs: ["FSC®"], cust: true,
      },
      {
        id: "bio-dunisoft", name: "Bio Dunisoft® Serviette", mat: "Bio Dunisoft®",
        sizes: ["40 x 40 cm"],
        packs: ["60 (12×5)", "180 (6×30)"],
        colors: [
          { n: "Weiß", h: "#FFFFFF", l: 1 }, { n: "Schwarz", h: "#181818" },
          { n: "Leaf Green", h: "#4CAF50" }, { n: "Sand", h: "#D2B48C" },
        ],
        price: 55.0, t: "napkin", certs: ["FSC®", "ecoecho®", "OK Compost HOME"], cust: false,
      },
    ],
  },
  {
    id: "tablecovers", name: "Tischdecken", en: "Table Covers",
    products: [
      {
        id: "dunicel", name: "Dunicel® Tischdecke", mat: "Dunicel®",
        sizes: ["118×160 cm", "118×220 cm", "125×160 cm", "125×220 cm"],
        packs: ["25 (5×5)", "50 (10×5)"],
        colors: [
          { n: "Weiß", h: "#FFFFFF", l: 1 }, { n: "Schwarz", h: "#181818" },
          { n: "Creme", h: "#F5F0E1", l: 1 }, { n: "Bordeaux", h: "#800020" },
          { n: "Dunkelblau", h: "#1A237E" }, { n: "Mint Blue", h: "#A8D8EA", l: 1 },
        ],
        price: 89.0, t: "tablecover", certs: ["FSC®"], cust: true,
      },
      {
        id: "evolin", name: "Evolin® Tischdecke", mat: "Evolin®",
        sizes: ["110×110 cm", "127×180 cm", "127×220 cm"],
        packs: ["15 (1×15)", "25 (5×5)"],
        colors: [
          { n: "Weiß", h: "#FFFFFF", l: 1 }, { n: "Schwarz", h: "#181818" },
          { n: "Greige", h: "#C8BFA9" }, { n: "Granite Grey", h: "#9E9E9E" },
        ],
        price: 125.0, t: "tablecover", certs: ["FSC®", "Premium"], cust: true,
      },
    ],
  },
  {
    id: "candles", name: "Kerzen & LED", en: "Candles & LED",
    products: [
      {
        id: "zelda", name: "LED Lamp Cordless Zelda", mat: "Metall / ABS",
        sizes: ["Midi (14 cm)", "Standard (18 cm)"],
        packs: ["1 Stk", "6 Stk/Krt"],
        colors: [
          { n: "Schwarz", h: "#181818" }, { n: "Gold", h: "#C9A96E" },
          { n: "Messing", h: "#B5A642" }, { n: "Weiß", h: "#FFFFFF", l: 1 },
        ],
        price: 35.6, t: "candle", certs: ["Rechargeable"], cust: false,
      },
    ],
  },
  {
    id: "takeaway", name: "Take-Away", en: "Take-Away Packaging",
    products: [
      {
        id: "bagasse", name: "ecoecho® Bagasse Bowl", mat: "Bagasse (Zuckerrohr)",
        sizes: ["500 ml", "750 ml", "1000 ml"],
        packs: ["50 Stk", "200 Stk", "400 Stk"],
        colors: [{ n: "Natur", h: "#D4C5A0" }],
        price: 28.0, t: "bowl", certs: ["ecoecho®", "OK Compost", "Plastikfrei"], cust: true,
      },
      {
        id: "cup", name: "ecoecho® Paper Cup", mat: "Papier (PLA)",
        sizes: ["200 ml", "350 ml", "470 ml"],
        packs: ["50 Stk", "500 Stk", "1000 Stk"],
        colors: [{ n: "Weiß", h: "#FFFFFF", l: 1 }, { n: "Kraft", h: "#C4A96A" }],
        price: 18.5, t: "cup", certs: ["ecoecho®", "OK Compost"], cust: true,
      },
    ],
  },
];

const INDUSTRIES = [
  { id: "restaurant", name: "Restaurant" },
  { id: "hotel", name: "Hotel" },
  { id: "catering", name: "Catering" },
  { id: "takeaway", name: "Take-Away" },
  { id: "supermarket", name: "Supermarkt" },
  { id: "festival", name: "Festival & Event" },
];

const CUST_TYPES = [
  { id: "text", name: "Textaufdruck", desc: "Individueller Text oder Slogan" },
  { id: "logo", name: "Logo-Druck", desc: "Firmenlogo auf dem Produkt" },
  { id: "emboss", name: "Prägung", desc: "Elegante Blindprägung" },
  { id: "pattern", name: "Muster / Design", desc: "Individuelles Muster oder Motiv" },
];

const PRINT_OPTS = [
  { name: "1-farbig", m: 1 },
  { name: "2-farbig", m: 1.3 },
  { name: "3-farbig", m: 1.6 },
  { name: "Vollfarbe (CMYK)", m: 2 },
];

// ═══ Shared Styles (inline, based on design tokens) ═══
const S = {
  topBar: {
    height: 57, background: T.black, color: T.white,
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 32, fontSize: 13, fontWeight: 400, padding: "0 24px",
    fontFamily: T.font,
  },
  header: {
    background: T.white, padding: "0 32px",
    borderBottom: `1px solid ${T.n200}`,
  },
  headerInner: {
    maxWidth: 1200, margin: "0 auto",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: 72,
  },
  logoMark: {
    background: T.black, color: T.white,
    fontSize: 16, fontWeight: 700, letterSpacing: 3,
    padding: "8px 16px", borderRadius: 4,
  },
  btn: {
    fontFamily: T.font, fontSize: 14, fontWeight: 500,
    textTransform: "uppercase", letterSpacing: 0.3,
    borderRadius: T.pill, padding: "18px 32px",
    cursor: "pointer", transition: "all 0.3s ease-in",
    border: `1px solid ${T.black}`,
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  },
  btnPrimary: { background: T.black, color: T.white },
  btnSecondary: { background: "transparent", color: T.n900 },
  btnSm: { padding: "10px 24px", fontSize: 13 },
  panel: {
    background: T.white, border: `1px solid ${T.n200}`,
    borderRadius: T.sharp, padding: 24,
  },
  panelTitle: {
    fontSize: 14, fontWeight: 500, textTransform: "uppercase",
    letterSpacing: 0.5, color: T.n500, marginBottom: 16,
  },
  chip: {
    padding: "10px 20px", borderRadius: T.sharp,
    border: `1px solid ${T.n300}`, background: T.white,
    fontFamily: T.font, fontSize: 14, fontWeight: 400,
    cursor: "pointer", transition: "all 0.3s ease-in", color: T.n700,
  },
  chipActive: { borderColor: T.n900, color: T.n900, fontWeight: 500, background: T.n100 },
  swatch: {
    width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
    border: "2px solid transparent", transition: "all 0.3s ease-in",
  },
  swatchActive: { borderColor: T.n900, outline: `2px solid ${T.n900}`, outlineOffset: 2 },
  badge: {
    display: "inline-block", padding: "3px 10px", borderRadius: T.sharp,
    fontSize: 12, fontWeight: 500, letterSpacing: 0.3, textTransform: "uppercase",
  },
  input: {
    fontFamily: T.font, fontSize: 16, color: T.n900,
    background: "transparent", border: `1px solid ${T.n300}`,
    borderRadius: T.sharp, padding: "12px 16px", height: 48,
    width: "100%", boxSizing: "border-box",
  },
};

// ═══ SVG Illustrations ═══
function ProdSVG({ type, color = "#CC0000", sz = 160 }) {
  const c = color || "#CC0000";
  const lt = ["#FFFFFF", "#F5F0E1", "#A8D8EA", "#D4C5A0"].includes(c);
  const s = lt ? T.n300 : "none";

  if (type === "napkin")
    return (
      <svg width={sz} height={sz} viewBox="0 0 200 200">
        <defs>
          <linearGradient id={`g${c.slice(1)}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c} stopOpacity=".95" />
            <stop offset="100%" stopColor={c} stopOpacity=".75" />
          </linearGradient>
        </defs>
        <rect x="30" y="20" width="140" height="155" fill={`url(#g${c.slice(1)})`} stroke={s} />
        <path d="M30 20Q100 55 170 20" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
        <path d="M30 65Q100 100 170 65" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
        <path d="M30 110Q100 145 170 110" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
      </svg>
    );

  if (type === "tablecover")
    return (
      <svg width={sz} height={sz} viewBox="0 0 200 200">
        <rect x="15" y="35" width="170" height="130" fill={c} stroke={s} />
        <line x1="15" y1="78" x2="185" y2="78" stroke="rgba(255,255,255,.15)" strokeWidth=".5" />
        <line x1="15" y1="121" x2="185" y2="121" stroke="rgba(255,255,255,.15)" strokeWidth=".5" />
        <line x1="75" y1="35" x2="75" y2="165" stroke="rgba(255,255,255,.15)" strokeWidth=".5" />
        <line x1="135" y1="35" x2="135" y2="165" stroke="rgba(255,255,255,.15)" strokeWidth=".5" />
      </svg>
    );

  if (type === "candle")
    return (
      <svg width={sz} height={sz} viewBox="0 0 200 200">
        <ellipse cx="100" cy="158" rx="30" ry="7" fill="rgba(0,0,0,.08)" />
        <rect x="78" y="58" width="44" height="100" fill={c} stroke={s} />
        <ellipse cx="100" cy="58" rx="22" ry="5" fill={c} stroke="rgba(255,255,255,.2)" />
        <circle cx="100" cy="42" r="10" fill="#FFD54F" opacity=".7" />
        <circle cx="100" cy="42" r="5" fill="#FFF9C4" opacity=".8" />
      </svg>
    );

  if (type === "bowl" || type === "cup")
    return (
      <svg width={sz} height={sz} viewBox="0 0 200 200">
        <path d="M68 48L58 148Q58 163 100 163Q142 163 142 148L132 48Z" fill={c} stroke="rgba(0,0,0,.1)" />
        <ellipse cx="100" cy="48" rx="32" ry="9" fill={c} stroke="rgba(0,0,0,.08)" />
        <ellipse cx="100" cy="48" rx="32" ry="9" fill="rgba(255,255,255,.12)" />
      </svg>
    );

  return <div style={{ width: sz, height: sz, background: T.n200 }} />;
}

// ═══ Main Component ═══
export default function DuniConfigurator() {
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState(null);
  const [cat, setCat] = useState(null);
  const [prod, setProd] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [pack, setPack] = useState(null);
  const [qty, setQty] = useState(1);
  const [custs, setCusts] = useState([]);
  const [custText, setCustText] = useState("");
  const [printIdx, setPrintIdx] = useState(0);
  const [basket, setBasket] = useState([]);
  const [modal, setModal] = useState(false);
  const [sample, setSample] = useState(false);
  const [eco, setEco] = useState(false);

  const STEPS = ["Branche", "Kategorie", "Produkt", "Variante", "Individualisierung", "Warenkorb"];

  // Navigation
  const goInd = (i) => { setIndustry(i); setStep(1); };
  const goCat = (c) => { setCat(c); setProd(null); setStep(2); };
  const goProd = (p) => {
    setProd(p); setColor(p.colors[0]); setSize(p.sizes[0]); setPack(p.packs[0]);
    setQty(1); setCusts([]); setCustText(""); setPrintIdx(0); setSample(false); setStep(3);
  };
  const togCust = (ct) => setCusts((p) => p.find((c) => c.id === ct.id) ? p.filter((c) => c.id !== ct.id) : [...p, ct]);

  // Pricing
  const calcPrice = () => {
    if (!prod) return 0;
    let p = prod.price * (1 + prod.sizes.indexOf(size) * 0.15);
    if (custs.length > 0) { p *= 1.25; if (printIdx > 0) p *= PRINT_OPTS[printIdx].m; }
    if (qty >= 50) p *= 0.85; else if (qty >= 20) p *= 0.9; else if (qty >= 10) p *= 0.95;
    return Math.round(p * 100) / 100;
  };

  // Basket
  const addToBasket = () => {
    setBasket((p) => [...p, {
      id: Date.now(), prod, color, size, pack, qty,
      custs: [...custs], custText, printOpt: PRINT_OPTS[printIdx],
      unit: calcPrice(), total: calcPrice() * qty,
    }]);
    setStep(5);
  };
  const rmItem = (id) => setBasket((p) => p.filter((i) => i.id !== id));
  const addMore = () => { setProd(null); setCusts([]); setCustText(""); setQty(1); setStep(1); };
  const bTotal = basket.reduce((s, i) => s + i.total, 0);

  // Filtered categories
  const cats = eco
    ? CATEGORIES.map((c) => ({
        ...c,
        products: c.products.filter((p) =>
          p.certs.some((cr) => cr.includes("eco") || cr.includes("Bio") || cr.includes("Compost"))
        ),
      })).filter((c) => c.products.length > 0)
    : CATEGORIES;

  // Note: Full render logic follows the same structure as the HTML version above.
  // This JSX component can be imported and rendered in any React application.
  // For the complete render implementation, see duni-configurator.html

  return (
    <div style={{ fontFamily: T.font, background: T.white, minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={S.topBar}>
        <span>✓ Dine-in and take-away solutions experts</span>
        <span>✓ Award winning innovations & designs</span>
        <span>✓ Driven by sustainability</span>
        <span>✓ 75 years of experience</span>
      </div>

      {/* Header */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={S.logoMark}>DUNI</div>
            <span style={{ fontSize: 14, fontWeight: 500, color: T.n700, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Produkt-Konfigurator
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.n700, cursor: "pointer" }}>
              <input type="checkbox" checked={eco} onChange={() => setEco(!eco)} style={{ accentColor: T.teal }} />
              Nur nachhaltige Produkte
            </label>
            {basket.length > 0 && (
              <button
                onClick={() => setStep(5)}
                style={{ ...S.btn, ...S.btnPrimary, ...S.btnSm }}
              >
                Warenkorb ({basket.length})
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Steps */}
      <div style={{ background: T.n50, padding: "16px 32px", borderBottom: `1px solid ${T.n200}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button
                onClick={() => i <= step && setStep(i)}
                disabled={i > step}
                style={{
                  fontFamily: T.font,
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 18px", borderRadius: T.pill,
                  border: i === step ? `1px solid ${T.black}` : i < step ? `1px solid ${T.n900}` : `1px solid ${T.n300}`,
                  background: i === step ? T.black : T.white,
                  color: i === step ? T.white : i < step ? T.n900 : T.n500,
                  fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.3,
                  cursor: i <= step ? "pointer" : "default",
                  transition: "all 0.3s ease-in",
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: i === step ? "rgba(255,255,255,0.2)" : T.n100,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 600,
                }}>
                  {i < step ? "✓" : i + 1}
                </span>
                {s}
              </button>
              {i < STEPS.length - 1 && (
                <div style={{ width: 20, height: 1, background: i < step ? T.n900 : T.n300 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content — same structure as HTML version */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
        <p style={{ fontSize: 14, color: T.n500, textAlign: "center" }}>
          Vollständige Render-Logik: siehe duni-configurator.html
        </p>
      </main>

      {/* Footer */}
      <footer style={{ background: T.n800, color: T.white, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 14, opacity: 0.7 }}>
          © Duni 2026 · Produkt-Konfigurator · Prototyp · Good Food Mood
        </div>
      </footer>
    </div>
  );
}
