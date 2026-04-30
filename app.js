const VERSION = "v1.4.0";

const { useState, useEffect, useMemo } = React;

// --- Constants & Data ---
const TEST_DATA = {
  "WISC-V": {
    konfidenz: "95%",
    primaereIndizes: [
      { name: "Gesamt-IQ", kuerzel: "G-IQ" },
      { name: "Sprachverständnis", kuerzel: "SV" },
      { name: "Visuell-Räumliche Verarbeitung", kuerzel: "VRV" },
      { name: "Fluides Schlussfolgern", kuerzel: "FS" },
      { name: "Arbeitsgedächtnis", kuerzel: "AGD" },
      { name: "Verarbeitungsgeschwindigkeit", kuerzel: "VG" },
    ],
    sekundaereIndizes: [
      { name: "Allgemeiner Fähigkeitsindex", kuerzel: "AFI" },
      { name: "Nonverbaler Index", kuerzel: "NVI" },
      { name: "Quantitatives Schlussfolgern", kuerzel: "QS" },
      { name: "Auditives Arbeitsgedächtnis", kuerzel: "AAGD" },
      { name: "Kognitiver Leistungsindex", kuerzel: "KLI" },
    ],
    untertests: [
      { name: "Gemeinsamkeiten finden", index: "SV", primaer: true },
      { name: "Wortschatz-Test", index: "SV", primaer: true },
      { name: "Allgemeines Wissen", index: "SV", primaer: false },
      { name: "Allgemeines Verständnis", index: "SV", primaer: false },
      { name: "Mosaik-Test", index: "VRV", primaer: true },
      { name: "Visuelle Puzzles", index: "VRV", primaer: true },
      { name: "Matrizen-Test", index: "FS", primaer: true },
      { name: "Formenwaage", index: "FS", primaer: true },
      { name: "Bilderfolgen", index: "FS", primaer: false },
      { name: "Rechnerisches Denken", index: "FS", primaer: false },
      { name: "Zahlen nachsprechen", index: "AGD", primaer: true },
      { name: "Buchstaben-Zahlen-Folgen", index: "AGD", primaer: false },
      { name: "Zahlen-Symbol-Test", index: "VG", primaer: true },
      { name: "Symbol-Suche", index: "VG", primaer: true },
      { name: "Durchstreich-Test", index: "VG", primaer: false },
    ],
  },
  "WPPSI-IV": {
    konfidenz: "95%",
    primaereIndizes: [
      { name: "Gesamt-IQ", kuerzel: "G-IQ" },
      { name: "Sprachverständnis", kuerzel: "SV" },
      { name: "Visuell-Räumliche Verarbeitung", kuerzel: "VRV" },
      { name: "Fluides Schlussfolgern", kuerzel: "FS" },
      { name: "Arbeitsgedächtnis", kuerzel: "AGD" },
      { name: "Verarbeitungsgeschwindigkeit", kuerzel: "VG" },
    ],
    sekundaereIndizes: [
      { name: "Wortschatzerwerb", kuerzel: "WE" },
      { name: "Nonverbaler Index", kuerzel: "NVI" },
      { name: "Allgemeiner Fähigkeitsindex", kuerzel: "AFI" },
      { name: "Kognitiver Leistungsindex", kuerzel: "KLI" },
    ],
    untertests: [
      { name: "Allgemeines Wissen", index: "SV", primaer: true },
      { name: "Gemeinsamkeiten finden", index: "SV", primaer: true },
      { name: "Wortschatz-Test", index: "SV", primaer: false },
      { name: "Allgemeines Verständnis", index: "SV", primaer: false },
      { name: "Mosaik-Test", index: "VRV", primaer: true },
      { name: "Figuren legen", index: "VRV", primaer: false },
      { name: "Matrizen-Test", index: "FS", primaer: true },
      { name: "Bildkonzepte", index: "FS", primaer: false },
      { name: "Bilder wiedererkennen", index: "AGD", primaer: true },
      { name: "Tiere platzieren", index: "AGD", primaer: false },
      { name: "Insekten-Suche", index: "VG", primaer: true },
      { name: "Objekte markieren", index: "VG", primaer: false },
      { name: "Tier-Symbol-Test", index: "VG", primaer: false },
      { name: "Passiver Wortschatz-Test", index: "WE", primaer: false },
      { name: "Bilder benennen", index: "WE", primaer: false },
    ],
  },
  "KABC-II": {
    konfidenz: "90%",
    primaereIndizes: [
      { name: "Fluid-Kristallin Index", kuerzel: "FKI" },
      { name: "Sequentiell / Kurzzeitgedächtnis", kuerzel: "Gsm" },
      { name: "Simultan / Visuelle Verarbeitung", kuerzel: "Gv" },
      { name: "Lernen / Langzeitgedächtnis", kuerzel: "Glr" },
      { name: "Wissen / Kristalline Fähigkeit", kuerzel: "Gc" },
    ],
    sekundaereIndizes: [
      { name: "Abruf nach Intervall", kuerzel: "AI" },
    ],
    untertests: [
      { name: "Zahlen nachsprechen", index: "Gsm", primaer: true },
      { name: "Wortreihe", index: "Gsm", primaer: true },
      { name: "Handbewegungen", index: "Gsm", primaer: false },
      { name: "Konzeptbildung", index: "Gv", primaer: true },
      { name: "Rover", index: "Gv", primaer: true },
      { name: "Dreiecke", index: "Gv", primaer: true },
      { name: "Muster ergänzen", index: "Gv", primaer: true },
      { name: "Geschichten ergänzen", index: "Gv", primaer: false },
      { name: "Gestaltschließen", index: "Gv", primaer: false },
      { name: "Bausteine zählen", index: "Gv", primaer: false },
      { name: "Atlantis", index: "Glr", primaer: true },
      { name: "Symbole", index: "Glr", primaer: true },
      { name: "Wortschatz", index: "Gc", primaer: true },
      { name: "Rätsel", index: "Gc", primaer: true },
      { name: "Wort- und Sachwissen", index: "Gc", primaer: false },
      { name: "Atlantis Abruf nach Intervall", index: "AI", primaer: false },
      { name: "Symbole Abruf nach Intervall", index: "AI", primaer: false },
    ],
  },
};

const KLASSIFIKATIONEN = [
  "Weit überdurchschnittlich (PR >= 95 / IQ >= 125)",
  "Überdurchschnittlich (PR 75-94 / IQ 110-124)",
  "Durchschnittlich (PR 25-74 / IQ 90-109)",
  "Unterdurchschnittlich (PR 9-24 / IQ 80-89)",
  "Weit unterdurchschnittlich (PR <= 8 / IQ <= 79)",
];

// --- Helper Functions ---
const emptyIdx = (name, kuerzel) => ({ name, kuerzel, wert: "", pr: "", ki: "", klassifikation: "" });
const emptyUT  = (name, index, primaer) => ({ name, index, primaer, wertpunkte: "" });

// Helper: Build display name from form state
const getPersonName = (vorname, nachname, geschlecht) => {
    if (vorname || nachname) return `${vorname} ${nachname}`.trim();
    if (geschlecht === "Männlich") return "Tom";
    if (geschlecht === "Weiblich") return "Ida";
    return "die Testperson";
};

// --- Encryption & Storage ---
const SECRET_KEY=atob("YW50aWdyYXZpdHlzZWNyZXQ="); // Local obfuscation key

const StorageManager = {
    save: (key, value) => {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
        localStorage.setItem(key, ciphertext);
    },
    load: (key) => {
        const ciphertext = localStorage.getItem(key);
        if (!ciphertext) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;
        } catch (e) {
            console.error("Decryption failed", e);
            return null;
        }
    }
};

// --- Components ---

// Global debounce for lucide icon rendering to avoid DOM-scanning on every icon mount
let lucidePending = false;
function scheduleLucideRefresh() {
    if (lucidePending) return;
    lucidePending = true;
    requestAnimationFrame(() => {
        if (window.lucide) window.lucide.createIcons();
        lucidePending = false;
    });
}

function Icon({ name, size = 20, className = "" }) {
    useEffect(() => {
        scheduleLucideRefresh();
    }, [name]);
    return <i data-lucide={name} className={className} style={{ width: size, height: size }}></i>;
}

function InputField({ label, value, onChange, placeholder, type = "text", icon }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label>{label}</label>}
            <div style={{ position: 'relative' }}>
                <input 
                    type={type} 
                    value={value} 
                    onChange={e => onChange(e.target.value)} 
                    placeholder={placeholder}
                />
                {icon && <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}><Icon name={icon} size={16} /></div>}
            </div>
        </div>
    );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label>{label}</label>}
            <textarea 
                value={value} 
                onChange={e => onChange(e.target.value)} 
                placeholder={placeholder}
                rows={rows}
                style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit' }}
            />
        </div>
    );
}

function IndexTable({ rows, onUpdate, onAdd, label, konfidenz, sonstiges }) {
    return (
        <div className="glass-card animate-fade-in">
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="bar-chart-2" /> {label}
            </h3>
            <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Index / Skala</th>
                            <th style={{ width: 80 }}>IW</th>
                            <th style={{ width: 80 }}>PR</th>
                            <th style={{ width: 140 }}>KI ({konfidenz})</th>
                            <th>Klassifikation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i}>
                                <td>
                                    {sonstiges 
                                        ? <input value={r.name} onChange={e => onUpdate(i, "name", e.target.value)} placeholder="Indexname" />
                                        : <div style={{ fontWeight: 600 }}>{r.name} <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>({r.kuerzel})</span></div>
                                    }
                                </td>
                                <td><input value={r.wert} onChange={e => onUpdate(i, "wert", e.target.value)} placeholder="-" style={{ textAlign: 'center' }} /></td>
                                <td><input value={r.pr} onChange={e => onUpdate(i, "pr", e.target.value)} placeholder="-" style={{ textAlign: 'center' }} /></td>
                                <td><input value={r.ki} onChange={e => onUpdate(i, "ki", e.target.value)} placeholder="z.B. 90-110" /></td>
                                <td>
                                    <select value={r.klassifikation} onChange={e => onUpdate(i, "klassifikation", e.target.value)}>
                                        <option value="">- wählen -</option>
                                        {KLASSIFIKATIONEN.map(k => <option key={k} value={k}>{k}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {sonstiges && (
                <button onClick={onAdd} style={{ marginTop: '1rem', color: 'var(--primary)', background: 'none', fontSize: '0.9rem' }}>
                    <Icon name="plus-circle" size={16} /> Index hinzufügen
                </button>
            )}
        </div>
    );
}

const DEFAULT_PROMPT_TEMPLATE = `Erstelle einen professionellen psychologischen Diagnostikbericht auf Deutsch.
Name der Testperson: {{PERSON_NAME}}
Pronomen: {{PRON_NOM}} / {{PRON_DAT}}
Alter: {{ALTER}}
Testverfahren: {{TEST}}

Anlass: {{ANLASS}}
Zusätzliche Verfahren: {{VERFAHREN}}
Verhaltensbeobachtung: {{VERHALTEN}}

Ergebnisse Primäre Indizes:
{{PRIMAERE_IDX}}

Ergebnisse Sekundäre Indizes:
{{SEKUNDAERE_IDX}}

Ergebnisse Untertests:
{{UNTERTESTS}}

Gesamtinterpretation: {{INTERPRETATION}}
Empfehlungen: {{EMPFEHLUNGEN}}

Gliederung: Anlass, Testverfahren, Verhaltensbeobachtung, Ergebnisse, Interpretation, Empfehlungen.
Schreibe sachlich, präzise und fachlich fundiert.`;

const DEFAULT_SYSTEM_PROMPT = `Du bist ein erfahrener psychologischer Diagnostiker. Du erstellst professionelle, sachliche und präzise Diagnostikberichte auf Deutsch. Berücksichtige alle angegebenen Werte und formuliere fachlich fundiert.`;

function SettingsPanel({ isOpen, onClose, config, setConfig, theme, setTheme }) {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadModels = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${config.baseUrl}/v1/models`, {
                headers: { 'Authorization': `Bearer ${config.apiKey}` }
            });
            const data = await res.json();
            if (data.data) {
                setModels(data.data.map(m => m.id));
            }
        } catch (e) {
            alert("Fehler beim Laden der Modelle: " + e.message);
        }
        setLoading(false);
    };

    // Focus trap for modal
    useEffect(() => {
        if (!isOpen) return;
        
        const panel = document.getElementById('settings-panel');
        if (!panel) return;
        
        const focusableElements = panel.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        firstElement?.focus();
        
        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        };
        
        panel.addEventListener('keydown', handleTabKey);
        return () => panel.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    return (
        <>
            <div 
                className={`overlay ${isOpen ? 'visible' : ''}`} 
                onClick={onClose}
                role="presentation"
                aria-hidden={!isOpen}
            ></div>
            <div 
                id="settings-panel"
                className={`settings-panel ${isOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-title"
                aria-hidden={!isOpen}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 id="settings-title" style={{ color: 'var(--text-main)', margin: 0 }}>KI Einstellungen</h2>
                    <button 
                        onClick={onClose} 
                        style={{ background: 'none', color: 'var(--text-muted)' }}
                        aria-label="Einstellungen schließen"
                        title="Schließen (Escape)"
                    >
                        <Icon name="x" />
                    </button>
                </div>

                <InputField label="API Base URL" value={config.baseUrl} onChange={v => setConfig({...config, baseUrl: v})} placeholder="https://..." />
                <InputField label="API Key" value={config.apiKey} onChange={v => setConfig({...config, apiKey: v})} type="password" placeholder="sk-..." icon="key" />
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="model-select">Modell</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select 
                            id="model-select"
                            style={{ flex: 1 }} 
                            value={config.model} 
                            onChange={e => setConfig({...config, model: e.target.value})}
                            aria-label="KI-Modell auswählen"
                        >
                            <option value="">- Modell wählen -</option>
                            {models.map(m => <option key={m} value={m}>{m}</option>)}
                            {config.model && !models.includes(config.model) && <option value={config.model}>{config.model}</option>}
                        </select>
                        <button 
                            onClick={loadModels} 
                            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                            aria-label="Modelle neu laden"
                            title="Modelle aktualisieren"
                        >
                            <Icon name="refresh-cw" size={18} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="system-prompt">System-Prompt</label>
                    <textarea
                        id="system-prompt"
                        value={config.systemPrompt || DEFAULT_SYSTEM_PROMPT}
                        onChange={e => setConfig({...config, systemPrompt: e.target.value})}
                        rows={3}
                        style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                        aria-describedby="system-prompt-help"
                    />
                    <small id="system-prompt-help" style={{ color: 'var(--text-muted)' }}>Definiert die Rolle und das Verhalten der KI.</small>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="prompt-template">Berichts-Prompt Template</label>
                    <textarea
                        id="prompt-template"
                        value={config.promptTemplate || DEFAULT_PROMPT_TEMPLATE}
                        onChange={e => setConfig({...config, promptTemplate: e.target.value})}
                        rows={8}
                        style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                        aria-describedby="prompt-template-help"
                    />
                    <small id="prompt-template-help" style={{ color: 'var(--text-muted)' }}>Verfügbare Platzhalter: {'{PERSON_NAME}'}, {'{PRON_NOM}'}, {'{PRON_DAT}'}, {'{ALTER}'}, {'{TEST}'}, {'{ANLASS}'}, {'{VERFAHREN}'}, {'{VERHALTEN}'}, {'{PRIMAERE_IDX}'}, {'{SEKUNDAERE_IDX}'}, {'{UNTERTESTS}'}, {'{INTERPRETATION}'}, {'{EMPFEHLUNGEN}'}</small>
                </div>

                <fieldset style={{ marginBottom: '1.5rem', border: 'none', padding: 0 }}>
                    <legend style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Erscheinungsbild</legend>
                    <div className="theme-toggle" role="radiogroup" aria-label="Theme auswählen">
                        <label className="theme-option" style={{ cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="theme"
                                value="modern"
                                checked={theme === 'modern'}
                                onChange={() => setTheme('modern')}
                                aria-label="Modernes Design mit Glassmorphism"
                            />
                            <div>
                                <div className="theme-option-label">Modern</div>
                                <div className="theme-option-desc">Aktuelles Design mit Glassmorphism</div>
                            </div>
                        </label>
                        <label className="theme-option" style={{ cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="theme"
                                value="zsl"
                                checked={theme === 'zsl'}
                                onChange={() => setTheme('zsl')}
                                aria-label="ZSL Design basierend auf zsl-bw.de"
                            />
                            <div>
                                <div className="theme-option-label">ZSL</div>
                                <div className="theme-option-desc">Offizielles Design (zsl-bw.de)</div>
                            </div>
                        </label>
                    </div>
                </fieldset>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                        className="btn-primary" 
                        onClick={() => { StorageManager.save('ai_config', config); onClose(); }}
                        aria-label="Einstellungen speichern und schließen"
                    >
                        Speichern
                    </button>
                    <button 
                        onClick={() => setConfig({...config, systemPrompt: DEFAULT_SYSTEM_PROMPT, promptTemplate: DEFAULT_PROMPT_TEMPLATE})} 
                        style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-sm)', background: 'white', border: '1px solid var(--border)' }}
                        aria-label="Prompts auf Standard zurücksetzen"
                    >
                        Zurücksetzen
                    </button>
                </div>
            </div>
        </>
    );
}

// --- Main App ---

function App() {
    const [step, setStep] = useState("form");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [theme, setTheme] = useState("zsl");
    const [config, setConfig] = useState({
        baseUrl: 'https://openwebui.sbbz-ilvesheim.de/api',
        apiKey: '',
        model: ''
    });

    useEffect(() => {
        const savedTheme = StorageManager.load('app_theme');
        // Use saved theme if user explicitly chose one, otherwise default to ZSL
        const effectiveTheme = savedTheme || 'zsl';
        setTheme(effectiveTheme);
        document.body.setAttribute('data-theme', effectiveTheme);
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = effectiveTheme === 'zsl' ? 'favicon-zsl.svg?v=1' : 'favicon.svg?v=1';
        }
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Strg+, or Strg+E: Open settings
            if ((e.ctrlKey || e.metaKey) && (e.key === ',' || e.key === 'e' || e.key === 'E')) {
                e.preventDefault();
                setIsSettingsOpen(true);
            }
            // Escape: Close settings
            if (e.key === 'Escape' && isSettingsOpen) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isSettingsOpen]);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
        StorageManager.save('app_theme', newTheme);
        // Favicon wechseln
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = newTheme === 'zsl' ? 'favicon-zsl.svg?v=1' : 'favicon.svg?v=1';
        }
    };

    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState("");
    const [copied, setCopied] = useState(false);

    // Form State
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [geschlecht, setGeschlecht] = useState("");
    const [alter, setAlter] = useState("");
    const [testauswahl, setTestauswahl] = useState("");
    const [activeTab, setActiveTab] = useState("primaer");
    const [anlass, setAnlass] = useState("");
    const [testverfahrenText, setTestverfahrenText] = useState("");
    const [verhalten, setVerhalten] = useState("");
    const [interpretation, setInterpretation] = useState("");
    const [empfehlungen, setEmpfehlungen] = useState("");
    const [primaereIndizes, setPrimaereIndizes] = useState([]);
    const [sekundaereIndizes, setSekundaereIndizes] = useState([]);
    const [untertests, setUntertests] = useState([]);

    useEffect(() => {
        const saved = StorageManager.load('ai_config');
        if (saved) setConfig(saved);
    }, []);

    const selectTest = (t) => {
        setTestauswahl(t);
        setActiveTab("primaer");
        if (t === "Sonstiges") {
            setPrimaereIndizes([emptyIdx("", "")]);
            setSekundaereIndizes([]);
            setUntertests([]);
            return;
        }
        const d = TEST_DATA[t];
        setPrimaereIndizes(d.primaereIndizes.map(i => emptyIdx(i.name, i.kuerzel)));
        setSekundaereIndizes(d.sekundaereIndizes.map(i => emptyIdx(i.name, i.kuerzel)));
        setUntertests(d.untertests.map(u => emptyUT(u.name, u.index, u.primaer)));
    };

    const updIdx = (arr, setArr) => (i, field, val) =>
        setArr(arr.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
    const updUT = (i, val) =>
        setUntertests(prev => prev.map((r, idx) => idx === i ? { ...r, wertpunkte: val } : r));

    const exportToWord = () => {
        if (!report) return;
        const personName = getPersonName(vorname, nachname, geschlecht);
        const fileNameBase = (vorname || nachname) ? personName : "Diagnostikbericht";
        const htmlContent = marked.parse(report);
        const html = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/1999/xhtml'>
            <head><meta charset='utf-8'><title>Bericht</title>
            <style>
                body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.5; }
                h1 { font-size: 18pt; color: #2d3748; }
                h2 { font-size: 14pt; color: #4a5568; margin-top: 18pt; }
                h3 { font-size: 12pt; color: #4a5568; }
                p { margin: 6pt 0; }
                ul, ol { margin: 6pt 0; padding-left: 24pt; }
                li { margin: 3pt 0; }
                strong { font-weight: 700; }
                table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
                th, td { border: 1px solid #cbd5e0; padding: 6pt; }
                th { background: #edf2f7; font-weight: 600; }
            </style>
            </head>
            <body>
                <h1>Diagnostikbericht${personName ? ' – ' + personName : ''}</h1>
                ${htmlContent}
            </body>
            </html>`;
        const converted = htmlDocx.asBlob(html);
        saveAs(converted, `${fileNameBase}.docx`);
    };

    const generateReport = async () => {
        if (!config.apiKey || !config.model) {
            alert("Bitte konfigurieren Sie zuerst den API Key und das Modell in den Einstellungen.");
            setIsSettingsOpen(true);
            return;
        }

        setLoading(true);
        setStep("report");

        const fmtIdx = (arr) => arr.filter(r => r.wert || r.pr).map(r => 
            `- ${r.name} (${r.kuerzel}): IW=${r.wert}, PR=${r.pr}, KI=${r.ki}, ${r.klassifikation}`
        ).join("\n") || "(keine Angaben)";

        const fmtUT = (arr) => arr.filter(r => r.wertpunkte).map(r => 
            `- ${r.name} [${r.index}]: WP=${r.wertpunkte}`
        ).join("\n") || "(keine Angaben)";

        const personName = getPersonName(vorname, nachname, geschlecht);
        const pronNom = geschlecht === "Männlich" ? "Er" : geschlecht === "Weiblich" ? "Sie" : "Es";
        const pronDat = geschlecht === "Männlich" ? "ihm" : geschlecht === "Weiblich" ? "ihr" : "ihm/ihr";

        const template = config.promptTemplate || DEFAULT_PROMPT_TEMPLATE;
        const prompt = template
            .replace(/\{\{PERSON_NAME\}\}/g, personName)
            .replace(/\{\{PRON_NOM\}\}/g, pronNom)
            .replace(/\{\{PRON_DAT\}\}/g, pronDat)
            .replace(/\{\{ALTER\}\}/g, alter || "-")
            .replace(/\{\{TEST\}\}/g, testauswahl || "-")
            .replace(/\{\{ANLASS\}\}/g, anlass || "(keine Angaben)")
            .replace(/\{\{VERFAHREN\}\}/g, testverfahrenText || "(keine Angaben)")
            .replace(/\{\{VERHALTEN\}\}/g, verhalten || "(keine Angaben)")
            .replace(/\{\{PRIMAERE_IDX\}\}/g, fmtIdx(primaereIndizes))
            .replace(/\{\{SEKUNDAERE_IDX\}\}/g, fmtIdx(sekundaereIndizes))
            .replace(/\{\{UNTERTESTS\}\}/g, fmtUT(untertests))
            .replace(/\{\{INTERPRETATION\}\}/g, interpretation || "(keine Angaben)")
            .replace(/\{\{EMPFEHLUNGEN\}\}/g, empfehlungen || "(keine Angaben)");

        try {
            const res = await fetch(`${config.baseUrl}/v1/chat/completions`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [
                        { role: "system", content: config.systemPrompt || DEFAULT_SYSTEM_PROMPT },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7
                })
            });
            const data = await res.json();
            if (!res.ok) {
                const errMsg = data.error?.message || data.detail || `HTTP ${res.status}`;
                setReport(`**API-Fehler:** ${errMsg}\n\nBitte überprüfen Sie API-Key, Modell und URL in den Einstellungen.`);
            } else if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                setReport(`**Unerwartete API-Antwort:** Die KI hat keine gültige Antwort zurückgegeben.\n\nDebug: ${JSON.stringify(data, null, 2).slice(0, 500)}`);
            } else {
                setReport(data.choices[0].message.content);
            }
        } catch (e) {
            setReport(`**Netzwerkfehler:** ${e.message}\n\nPrüfen Sie Ihre Internetverbindung und die API-Konfiguration.`);
        }
        setLoading(false);
    };

    return (
        <>
            <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>

            <header className="zsl-header">
                <div className="zsl-header-inner">
                    <div className="zsl-header-logo">
                        <img src="zsl-logo.webp" alt="ZSL Baden-Württemberg" />
                    </div>
                    <nav className="zsl-header-nav">Diagnostikbericht Generator</nav>
                </div>
            </header>

            <main id="main-content" className="app-container" style={{ maxWidth: '900px', margin: '0 auto' }} role="main">
            <button 
                className="settings-trigger" 
                onClick={() => setIsSettingsOpen(true)}
                aria-label="Einstellungen öffnen"
                aria-expanded={isSettingsOpen}
                aria-controls="settings-panel"
                title="Einstellungen (Strg+,)"
            >
                <Icon name="settings" />
            </button>

                <SettingsPanel
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    config={config}
                    setConfig={setConfig}
                    theme={theme}
                    setTheme={toggleTheme}
                />

                <div className="title-section">
                    <h1>Diagnostikbericht Generator <span className="version-badge">{VERSION}</span></h1>
                    <p>Erstellen Sie präzise psychologische Berichte mit lokaler KI-Unterstützung.</p>
                </div>

            {step === "form" ? (
                <div className="animate-fade-in">
                    <div className="glass-card">
                        <label>ANGABEN ZUR TESTPERSON</label>
                        <div className="grid-2">
                            <InputField label="Vorname" value={vorname} onChange={setVorname} placeholder="z.B. Max" />
                            <InputField label="Nachname" value={nachname} onChange={setNachname} placeholder="z.B. Mustermann" />
                        </div>
                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GESCHLECHT</div>
                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                                    {["Männlich", "Weiblich"].map(g => (
                                        <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none', cursor: 'pointer' }}>
                                            <input type="radio" checked={geschlecht === g} onChange={() => setGeschlecht(g)} style={{ width: 'auto' }} /> {g}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <InputField label="Alter (JJ;MM)" value={alter} onChange={setAlter} placeholder="z.B. 08;11" />
                        </div>
                    </div>

                    <div className="glass-card">
                        <label>TESTVERFAHREN AUSWÄHLEN</label>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                            {["WISC-V", "WPPSI-IV", "KABC-II", "Sonstiges"].map(t => (
                                <button 
                                    key={t} 
                                    onClick={() => selectTest(t)}
                                    style={{ 
                                        padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-sm)', 
                                        background: testauswahl === t ? 'var(--primary)' : 'white',
                                        color: testauswahl === t ? 'white' : 'var(--text-main)',
                                        border: '1px solid var(--border)'
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card">
                        <label>1. ANLASS DER DIAGNOSTIK</label>
                        <TextArea value={anlass} onChange={setAnlass} placeholder="Fragestellung, Beschwerden..." />
                    </div>

                    <div className="glass-card">
                        <label>2. TESTVERFAHREN (ERGÄNZUNGEN / WEITERE TESTS)</label>
                        <TextArea value={testverfahrenText} onChange={setTestverfahrenText} placeholder="Anamnese, Fragebögen..." />
                    </div>

                    <div className="glass-card">
                        <label>3. VERHALTENSBEOBACHTUNG</label>
                        <TextArea value={verhalten} onChange={setVerhalten} placeholder="Kooperation, Konzentration..." />
                    </div>

                    {testauswahl && (
                        <div className="glass-card animate-fade-in">
                            <label>4. ERGEBNISSE NACH INDEXEN</label>
                            <div className="tab-bar">
                                <button className={`tab-button ${activeTab === "primaer" ? 'active' : ''}`} onClick={() => setActiveTab("primaer")}>Primäre Indizes</button>
                                {sekundaereIndizes.length > 0 && <button className={`tab-button ${activeTab === "sekundaer" ? 'active' : ''}`} onClick={() => setActiveTab("sekundaer")}>Sekundäre Indizes</button>}
                                {untertests.length > 0 && <button className={`tab-button ${activeTab === "untertests" ? 'active' : ''}`} onClick={() => setActiveTab("untertests")}>Untertests</button>}
                            </div>

                            {activeTab === "primaer" && <IndexTable rows={primaereIndizes} onUpdate={updIdx(primaereIndizes, setPrimaereIndizes)} onAdd={() => setPrimaereIndizes(p => [...p, emptyIdx("", "")])} label="Primäre Indizes" konfidenz={TEST_DATA[testauswahl]?.konfidenz || "95%"} sonstiges={testauswahl === "Sonstiges"} />}
                            {activeTab === "sekundaer" && <IndexTable rows={sekundaereIndizes} onUpdate={updIdx(sekundaereIndizes, setSekundaereIndizes)} onAdd={() => setSekundaereIndizes(p => [...p, emptyIdx("", "")])} label="Sekundäre Indizes" konfidenz={TEST_DATA[testauswahl]?.konfidenz || "95%"} sonstiges={testauswahl === "Sonstiges"} />}
                            
                            {activeTab === "untertests" && (
                                <div>
                                    <h3 style={{ color: 'var(--primary)' }}><Icon name="list" /> Untertests</h3>
                                    <table className="data-table">
                                        <thead><tr><th>Untertest</th><th>Index</th><th style={{ width: 100 }}>WP</th></tr></thead>
                                        <tbody>
                                            {untertests.map((u, i) => (
                                                <tr key={i}>
                                                    <td>{u.name}</td>
                                                    <td><span style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 700 }}>{u.index}</span></td>
                                                    <td><input value={u.wertpunkte} onChange={e => updUT(i, e.target.value)} style={{ textAlign: 'center' }} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="glass-card">
                        <label>5. GESAMTINTERPRETATION</label>
                        <TextArea value={interpretation} onChange={setInterpretation} placeholder="Stärken, Schwächen..." />
                    </div>

                    <div className="glass-card">
                        <label>6. EMPFEHLUNGEN</label>
                        <TextArea value={empfehlungen} onChange={setEmpfehlungen} placeholder="Förderung, Therapie..." />
                    </div>

                    <button className="btn-primary" onClick={generateReport}>
                        <Icon name="sparkles" /> Bericht generieren
                    </button>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <button onClick={() => setStep("form")} style={{ background: 'none', color: 'var(--primary)', fontWeight: 600 }}><Icon name="arrow-left" /> Zurück</button>
                            <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Bericht</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={exportToWord}
                                    style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', background: '#2563eb', color: 'white' }}
                                >
                                    <Icon name="file-text" size={18} /> Word
                                </button>
                                <button 
                                    onClick={() => { navigator.clipboard.writeText(report); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                    style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', background: copied ? '#10b981' : 'var(--primary)', color: 'white' }}
                                >
                                    <Icon name={copied ? "check" : "copy"} size={18} /> {copied ? "Kopiert" : "Kopieren"}
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <div className="animate-spin" style={{ marginBottom: '1rem' }}><Icon name="refresh-cw" size={48} /></div>
                                <p style={{ color: 'var(--text-muted)' }}>KI erstellt den Bericht...</p>
                            </div>
                        ) : (
                            <div className="report-content animate-fade-in" dangerouslySetInnerHTML={{ __html: marked.parse(report) }} />
                        )}
                    </div>
                </div>
            )}
        </main>

            <footer className="zsl-footer">
                <div className="zsl-footer-inner">
                    <div className="zsl-footer-left">
                        <div className="zsl-footer-logo">
                            <img src="zsl-logo-white.svg" alt="ZSL Logo" />
                        </div>
                        <div className="zsl-footer-text">
                            <strong>Diagnostikbericht Generator</strong><br/>
                            Professionelle psychologische Berichte
                        </div>
                    </div>
                    <div className="zsl-footer-right">
                        {VERSION} &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </footer>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
