// Builds Dr. Snigdha Sen's academic CV (A4) from her CV, brief profile and verified publication data.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, TabStopType,
  BorderStyle, Footer, PageNumber, LevelFormat, Table, TableRow, TableCell, WidthType, ShadingType,
} = require("docx");

const pubs = JSON.parse(fs.readFileSync(__dirname + "/pubs.json", "utf8"));

const FONT = "Cambria";
const ACCENT = "1F3A5F";
const MUTED = "555555";
const RIGHT = 9638; // A4 text width at 2 cm margins (11906 - 2*1134)

const t = (text, o = {}) => new TextRun({ text, font: FONT, size: 20, ...o });
const link = (text, url, o = {}) =>
  new ExternalHyperlink({ link: url, children: [t(text, { color: ACCENT, ...o })] });

const heading = (text) =>
  new Paragraph({
    spacing: { before: 240, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
    keepNext: true,
    children: [t(text.toUpperCase(), { bold: true, size: 22, color: ACCENT, characterSpacing: 20 })],
  });

const sub = (text) =>
  new Paragraph({ spacing: { before: 140, after: 60 }, keepNext: true, children: [t(text, { bold: true, italics: true, color: MUTED })] });

// Title on the left, dates right-aligned on the same line.
const entry = (title, dates, line2, line3) => {
  const out = [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
      spacing: { before: 100, after: 0 },
      keepNext: true,
      children: [t(title, { bold: true }), t("\t" + dates, { color: MUTED })],
    }),
  ];
  if (line2) out.push(new Paragraph({ spacing: { after: line3 ? 0 : 60 }, keepNext: !!line3, children: [t(line2, { italics: true })] }));
  if (line3) out.push(new Paragraph({ spacing: { after: 60 }, children: [t(line3, { color: MUTED, size: 19 })] }));
  return out;
};

const bullet = (children) =>
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 40 }, children });

// ---------- publications ----------
const short = (name) => {
  const [last, first = ""] = name.split(",").map((s) => s.trim());
  const initials = first.split(/[\s.]+/).filter(Boolean).map((p) => (p.length <= 2 && p === p.toUpperCase() ? p.split("").join(". ") : p[0]) + ".").join(" ");
  return initials ? `${initials} ${last}` : last;
};
const authorRuns = (authorStr) => {
  const names = authorStr.split(" and ").map((s) => s.trim());
  const runs = [];
  names.forEach((n, i) => {
    const sep = i === 0 ? "" : i === names.length - 1 ? (names.length > 2 ? ", and " : " and ") : ", ";
    if (sep) runs.push(t(sep));
    const isHer = /^Sen,\s*Snigdha/.test(n);
    runs.push(t(short(n), isHer ? { bold: true } : {}));
  });
  return runs;
};
const INDEX = {
  sen2025cnntransformer: "SCI, Scopus", sen2023imbalanced: "SCI, Scopus", sen2022review: "SCI, Scopus",
  doddashamachar2023banana: "SCI, Scopus", dabhade2026steganography: "Scopus", sk2025unet: "Scopus",
  mahesh2024banana: "Scopus", madhavi2025bamboo: "Scopus", nithya2026telemetry: "SCIE, Scopus",
};
const SCOPUS = new Set(JSON.parse(fs.readFileSync(__dirname + "/scopus_keys.json", "utf8")));
const tex = (s = "") => s.replace(/\\&/g, "&").replace(/--/g, "–");

const pubPara = (p, n) => {
  const venue = p.journal || p.booktitle || "";
  const runs = [t(`[${n}]\t`), ...authorRuns(p.author), t(`, “${tex(p.title)},” `)];
  if (p.type === "incollection") runs.push(t("in "));
  if (p.type === "inproceedings" && !/^(\d{4}|Proc)/.test(venue)) runs.push(t("in "));
  runs.push(t(tex(venue), { italics: true }));
  if (p.series && p.type !== "article") runs.push(t(`, ${p.series}`));
  if (p.volume) runs.push(t(`, vol. ${p.volume}`));
  if (p.number) runs.push(t(`, no. ${p.number}`));
  if (p.pages) runs.push(t(/–|--/.test(p.pages) ? `, pp. ${tex(p.pages)}` : `, art. ${p.pages}`));
  if (p.publisher && p.type !== "article") runs.push(t(`, ${p.publisher}`));
  runs.push(t(`, ${p.year}${p.note ? ` (${p.note.toLowerCase()})` : ""}.`));
  if (p.doi) runs.push(t(" "), link(`doi:${p.doi}`, `https://doi.org/${p.doi}`, { size: 18 }));
  const idx = INDEX[p.key] || (SCOPUS.has(p.key) ? "Scopus" : "");
  if (idx) runs.push(t(`  [${idx}]`, { color: MUTED, size: 18 }));
  return new Paragraph({
    tabStops: [{ type: TabStopType.LEFT, position: 520 }],
    indent: { left: 520, hanging: 520 },
    spacing: { after: 70 },
    children: runs,
  });
};

const byYear = (a, b) => b.year - a.year || a.title.localeCompare(b.title);
const isMagazine = (p) => /CSI Communications/.test(p.journal || "");
const journals = pubs.filter((p) => p.type === "article" && !isMagazine(p) && p.key !== "sen2020covid").sort(byYear);
const confs = pubs.filter((p) => p.type === "inproceedings" || p.key === "sen2020covid").sort(byYear);
const chapters = pubs.filter((p) => p.type === "incollection").sort(byYear);
const magazine = pubs.filter(isMagazine).sort(byYear);

let n = 0;
const numbered = (list) => list.map((p) => pubPara(p, ++n));

// ---------- grants table ----------
const cell = (text, w, o = {}) =>
  new TableCell({
    width: { size: w, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    shading: o.head ? { type: ShadingType.CLEAR, fill: "E8EEF5", color: "auto" } : undefined,
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "C8D3E0" },
    },
    children: [new Paragraph({ children: [t(text, { bold: !!o.head, size: 19 })] })],
  });
const GW = [4638, 1600, 1500, 1900];
const grantRow = (cols, head) => new TableRow({ tableHeader: head, children: cols.map((c, i) => cell(c, GW[i], { head })) });
const grants = new Table({
  width: { size: RIGHT, type: WidthType.DXA },
  columnWidths: GW,
  rows: [
    grantRow(["Project", "Role", "Agency", "Period"], true),
    grantRow(["Predicting the likelihood of PCOD from physical and psychological factors in young adult women using machine learning (₹3 lakh)", "Co-PI", "VGST, Govt. of Karnataka", "2019–20"]),
    grantRow(["Constructing small language models as subject-matter experts using minimal resources (student project grant)", "Mentor / Guide", "KSCST", "2023–24"]),
    grantRow(["Care-In-A-Cup: a solution to tend to the needs of differently abled women (student project grant)", "Mentor / Guide", "KSCST", "2021–22"]),
  ],
});

// ---------- document ----------
const children = [
  new Paragraph({ spacing: { after: 40 }, children: [t("Dr. Snigdha Sen", { bold: true, size: 40, color: ACCENT })] }),
  new Paragraph({ spacing: { after: 20 }, children: [t("Senior Assistant Professor, School of Computer Engineering", { size: 21 })] }),
  new Paragraph({ spacing: { after: 60 }, children: [t("Manipal Institute of Technology Bengaluru, Manipal Academy of Higher Education (MAHE)", { size: 21 })] }),
  new Paragraph({
    spacing: { after: 40 },
    children: [
      link("snigdha.sen@manipal.edu", "mailto:snigdha.sen@manipal.edu", { size: 19 }), t("   |   ", { color: MUTED, size: 19 }),
      link("snigdhasen.in", "https://snigdhasen.in", { size: 19 }), t("   |   ", { color: MUTED, size: 19 }),
      t("Bengaluru, India", { size: 19 }),
    ],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [
      t("ORCID ", { size: 19, color: MUTED }), link("0000-0001-7909-5193", "https://orcid.org/0000-0001-7909-5193", { size: 19 }),
      t("   |   ", { color: MUTED, size: 19 }), link("Google Scholar", "https://scholar.google.com/citations?user=u5dq7NMAAAAJ", { size: 19 }),
      t("   |   ", { color: MUTED, size: 19 }), link("Scopus 57223155667", "https://www.scopus.com/authid/detail.uri?authorId=57223155667", { size: 19 }),
    ],
  }),

  heading("Research Interests"),
  new Paragraph({
    spacing: { after: 60 },
    children: [t("Astroinformatics and astronomical big data; deep learning for photometric redshift estimation; explainable AI for space science; computer vision and image steganography; scalable machine learning on big-data platforms.")],
  }),

  heading("Profile at a Glance"),
  bullet([t("About 16 years of teaching experience in computer science and engineering; PhD (2024) from IIIT Allahabad.")]),
  bullet([t("57 publications, 46 of them indexed in Scopus (260 citations, h-index 9, as of Oct 2026), including "), t("New Astronomy", { italics: true }), t(", "), t("Experimental Astronomy", { italics: true }), t(", "), t("Signal, Image and Video Processing", { italics: true }), t(" and "), t("Multimedia Tools and Applications", { italics: true }), t(".")]),
  bullet([t("Two patents in emergency-response systems; funded projects from VGST and KSCST.")]),
  bullet([t("Guides 4 doctoral scholars at MAHE; has supervised 10+ M.Tech theses and 35+ undergraduate projects.")]),
  bullet([t("Invited speaker at IUCAA Pune, ISRO ISTRAC, IIIT Allahabad and IIIT Lucknow.")]),
  bullet([t("Editorial board member: "), t("The Visual Computer", { italics: true }), t("; "), t("Frontiers in Big Data", { italics: true }), t(".")]),

  heading("Academic Appointments"),
  ...entry("Senior Assistant Professor", "Mar 2024 – present", "Manipal Institute of Technology Bengaluru, MAHE", "School of Computer Engineering; Research Coordinator."),
  ...entry("Associate Professor", "Aug 2011 – Feb 2024", "Global Academy of Technology, Bengaluru", "Organised conferences, workshops and faculty development programmes; resource person for ML, deep learning, big data and cloud computing."),
  ...entry("Lecturer, Computer Science", "Jul 2005 – Jul 2007", "Aryabhatta Institute of Engineering & Management, Durgapur"),
  sub("Industry"),
  ...entry("Programmer Analyst Trainee", "Feb 2010 – Jun 2010", "Cognizant Technology Solutions, Kolkata"),

  heading("Education"),
  ...entry("Ph.D., Data Science & Deep Learning", "2019 – 2024", "Indian Institute of Information Technology Allahabad", "Supervisors: Prof. Pavan Chakraborty and Dr. Krishna Pratap Singh."),
  ...entry("M.Tech., Information Technology", "2007 – 2009", "Jadavpur University, Kolkata"),
  ...entry("B.E., Information Technology", "2001 – 2005", "University Institute of Technology, University of Burdwan"),

  heading("Publications"),
  new Paragraph({ spacing: { after: 60 }, children: [t("Reverse chronological. Indexing shown where known. Full list with links: ", { size: 19, color: MUTED }), link("snigdhasen.in/publications", "https://snigdhasen.in/publications/", { size: 19 })] }),
  sub("Journal Articles"), ...numbered(journals),
  sub("Conference Proceedings"), ...numbered(confs),
  sub("Book Chapters"), ...numbered(chapters),
  sub("Selected Articles in CSI Communications"), ...numbered(magazine),

  heading("Research Grants"),
  grants,

  heading("Patents"),
  bullet([t("A system and method for multimodal on-device emergency detection with indoor localization and alerts. "), t("Published.", { italics: true })]),
  bullet([t("A system and method for optimizing emergency medical response through real-time data integration. "), t("Published.", { italics: true })]),
  sub("Proposals under review"),
  bullet([t("Investigation of the Baby Dragon Hatchling (BDH) architecture for satellite remote sensing image applications — ISRO RESPOND.")]),
  bullet([t("A data-driven and sustainable AI/ML solution for enhancing rural education in Karnataka — VGST.")]),
  bullet([t("Digital preservation of Indian ancient heritage using AI and immersive technologies: a metaverse approach.")]),

  heading("Research Supervision"),
  bullet([t("Ph.D.: ", { bold: true }), t("guiding 4 doctoral scholars at MAHE (ongoing).")]),
  bullet([t("M.Tech.: ", { bold: true }), t("10+ theses supervised.")]),
  bullet([t("B.E./B.Tech.: ", { bold: true }), t("35+ projects supervised, including state-level exhibition and national ideathon winners.")]),

  heading("Invited Talks"),
  bullet([t("Transformer-based models for astronomical data — guest talk, "), t("IUCAA, Pune", { bold: true }), t(".")]),
  bullet([t("AI/ML training programme — "), t("ISRO Telemetry, Tracking and Command Network (ISTRAC)", { bold: true }), t(".")]),
  bullet([t("Skewed data distributions — guest lecture, "), t("IIIT Allahabad", { bold: true }), t(".")]),
  bullet([t("Deep Learning & its Application — invited talk, "), t("IIIT Lucknow", { bold: true }), t(".")]),

  heading("Professional Service"),
  bullet([t("Editorial board member, "), t("The Visual Computer", { italics: true }), t(" and "), t("Frontiers in Big Data", { italics: true }), t(".")]),
  bullet([t("Session chair at international conferences in India and abroad.")]),
  bullet([t("Lead editorial member for two forthcoming edited books.")]),
  bullet([t("Organiser and resource person for conferences, workshops and faculty development programmes.")]),
  bullet([t("Life member, Computer Society of India (CSI); organised CSI student-chapter events.")]),

  heading("Awards and Recognition (with student teams)"),
  ...entry("Winner, National-level Ideathon", "Jun 2021", "VVCE IEEE Computer Society Student Chapter", "Web app using data analytics to preserve the street-vendor tradition of India post-COVID-19."),
  ...entry("Winner, Paper Presentation", "Dec 2020", "34th CSI Karnataka State Student Convention, KSIT Bengaluru", "“Working with Docker: The New Industry Need.”"),
  ...entry("Selected for State-level Exhibition", "", "KSCST and VTU", "“Care-In-A-Cup: A Solution to Tend to the Needs of Differently Abled Women.”"),

];

const doc = new Document({
  creator: "Snigdha Sen",
  title: "Dr. Snigdha Sen — Curriculum Vitae",
  styles: { default: { document: { run: { font: FONT, size: 20 }, paragraph: { spacing: { line: 264 } } } } },
  numbering: {
    config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] }],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 850, bottom: 850, left: 1134, right: 1134 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: RIGHT }],
          children: [
            t("Snigdha Sen — Curriculum Vitae (October 2026)", { size: 16, color: MUTED }),
            t("\tPage ", { size: 16, color: MUTED }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED }),
            t(" of ", { size: 16, color: MUTED }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: MUTED }),
          ],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync(__dirname + "/Snigdha_Sen_Academic_CV.docx", b);
  console.log("ok", journals.length, confs.length, chapters.length, magazine.length);
});
