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

// --- Encryption & Storage ---
const SECRET_KEY = "antigravity-diagnostik-secret"; // Local obfuscation key

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

function Icon({ name, size = 20, className = "" }) {
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
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

function SettingsPanel({ isOpen, onClose, config, setConfig }) {
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

    return (
        <>
            <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
            <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--text-main)', margin: 0 }}>KI Einstellungen</h2>
                    <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)' }}><Icon name="x" /></button>
                </div>

                <InputField label="API Base URL" value={config.baseUrl} onChange={v => setConfig({...config, baseUrl: v})} placeholder="https://..." />
                <InputField label="API Key" value={config.apiKey} onChange={v => setConfig({...config, apiKey: v})} type="password" placeholder="sk-..." icon="key" />
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <label>Modell</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select style={{ flex: 1 }} value={config.model} onChange={e => setConfig({...config, model: e.target.value})}>
                            <option value="">- Modell wählen -</option>
                            {models.map(m => <option key={m} value={m}>{m}</option>)}
                            {config.model && !models.includes(config.model) && <option value={config.model}>{config.model}</option>}
                        </select>
                        <button onClick={loadModels} style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                            <Icon name="refresh-cw" size={18} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                <button className="btn-primary" onClick={() => { StorageManager.save('ai_config', config); onClose(); }}>
                    Speichern
                </button>
            </div>
        </>
    );
}

// --- Main App ---

function App() {
    const [step, setStep] = useState("form");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [config, setConfig] = useState({
        baseUrl: 'https://openwebui.sbbz-ilvesheim.de/api',
        apiKey: '',
        model: ''
    });

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
        const personName = (vorname || nachname) ? `${vorname} ${nachname}`.trim() : "Diagnostikbericht";
        const html = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/1999/xhtml'>
            <head><meta charset='utf-8'><title>Bericht</title></head>
            <body><h1>Diagnostikbericht${personName ? ' – ' + personName : ''}</h1><pre style="font-family:Calibri,sans-serif;white-space:pre-wrap;">${report.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre></body>
            </html>`;
        const converted = htmlDocx.asBlob(html);
        saveAs(converted, `${personName || 'Bericht'}.docx`);
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

        const personName = (vorname || nachname) ? `${vorname} ${nachname}`.trim() : (geschlecht === "Männlich" ? "Tom" : geschlecht === "Weiblich" ? "Ida" : "die Testperson");
        const pronNom = geschlecht === "Männlich" ? "Er" : geschlecht === "Weiblich" ? "Sie" : "Es";
        const pronDat = geschlecht === "Männlich" ? "ihm" : geschlecht === "Weiblich" ? "ihr" : "ihm/ihr";

        const prompt = `Erstelle einen professionellen psychologischen Diagnostikbericht auf Deutsch.
Name der Testperson: ${personName}
Pronomen: ${pronNom} / ${pronDat}
Alter: ${alter}
Testverfahren: ${testauswahl}

Anlass: ${anlass}
Zusätzliche Verfahren: ${testverfahrenText}
Verhaltensbeobachtung: ${verhalten}

Ergebnisse Primäre Indizes:
${fmtIdx(primaereIndizes)}

Ergebnisse Sekundäre Indizes:
${fmtIdx(sekundaereIndizes)}

Ergebnisse Untertests:
${fmtUT(untertests)}

Gesamtinterpretation: ${interpretation}
Empfehlungen: ${empfehlungen}

Gliederung: Anlass, Testverfahren, Verhaltensbeobachtung, Ergebnisse, Interpretation, Empfehlungen.
Schreibe sachlich, präzise und fachlich fundiert.`;

        try {
            const res = await fetch(`${config.baseUrl}/v1/chat/completions`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7
                })
            });
            const data = await res.json();
            setReport(data.choices[0].message.content);
        } catch (e) {
            setReport("Fehler bei der Generierung: " + e.message);
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <button className="settings-trigger" onClick={() => setIsSettingsOpen(true)}>
                <Icon name="settings" />
            </button>

            <SettingsPanel 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                config={config} 
                setConfig={setConfig} 
            />

            <div className="title-section">
                <h1>Diagnostikbericht Generator <span style={{ fontSize: '0.9rem', background: 'var(--primary)', color: 'white', padding: '2px 10px', borderRadius: '12px', verticalAlign: 'middle' }}>v1.1</span></h1>
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
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
                                <button onClick={() => setActiveTab("primaer")} style={{ color: activeTab === "primaer" ? 'var(--primary)' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Primäre Indizes</button>
                                {sekundaereIndizes.length > 0 && <button onClick={() => setActiveTab("sekundaer")} style={{ color: activeTab === "sekundaer" ? 'var(--primary)' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Sekundäre Indizes</button>}
                                {untertests.length > 0 && <button onClick={() => setActiveTab("untertests")} style={{ color: activeTab === "untertests" ? 'var(--primary)' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Untertests</button>}
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
                            <div className="report-content animate-fade-in">
                                {report}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
