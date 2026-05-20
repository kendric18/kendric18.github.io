// Kendric Toh CV Generator
// Bold design-portfolio style with terracotta accent palette
process.env.NODE_PATH = require('child_process').execSync('npm root -g').toString().trim();
require('module')._initPaths();

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, TabStopType, TabStopPosition,
} = require('docx');
const fs = require('fs');

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  terracotta: 'C4573A',
  terracottaLight: 'FDF0EC',
  darkBrown: '2A1A15',
  contactText: 'E8C8BC',
  dividerDot: '8B5040',
  white: 'FFFFFF',
  dark: '1A1A1A',
  muted: '666666',
  placeholder: '999999',
  tagline: 'F5C8B4',
};

// ── Page geometry (A4) ────────────────────────────────────────────────────────
const PW = 11906;     // A4 width DXA
const PH = 16838;     // A4 height DXA
const ML = 850;
const MR = 850;
const MT = 700;
const MB = 700;
const CW = PW - ML - MR;  // content width = 10206

// ── Border helpers ────────────────────────────────────────────────────────────
const nb = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: nb, bottom: nb, left: nb, right: nb, insideH: nb, insideV: nb };
const terracottaBorder = (sz = 8) => ({ style: BorderStyle.SINGLE, size: sz, color: C.terracotta });

// ── Section header bar ────────────────────────────────────────────────────────
function sectionHeader(title) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    borders: noBorders,
    rows: [new TableRow({ children: [new TableCell({
      borders: noBorders,
      shading: { fill: C.terracotta, type: ShadingType.CLEAR },
      margins: { top: 90, bottom: 90, left: 200, right: 200 },
      width: { size: CW, type: WidthType.DXA },
      children: [new Paragraph({
        children: [new TextRun({
          text: title,
          font: 'Arial', size: 18, bold: true, color: C.white, allCaps: true,
        })],
        spacing: { before: 0, after: 0 },
      })],
    })]})],
  });
}

// ── Spacer ────────────────────────────────────────────────────────────────────
function spacer(pts = 6) {
  return new Paragraph({ children: [], spacing: { before: 0, after: pts * 20 } });
}

// ── Thin terracotta rule ──────────────────────────────────────────────────────
function rule() {
  return new Paragraph({
    children: [],
    spacing: { before: 0, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.terracotta, space: 1 } },
  });
}

// ── Experience entry ──────────────────────────────────────────────────────────
function expEntry(role, org, period, bullets = []) {
  const out = [];
  out.push(new Paragraph({
    children: [
      new TextRun({ text: role, font: 'Arial', size: 20, bold: true, color: C.dark }),
      new TextRun({ text: '\t' + period, font: 'Arial', size: 17, color: C.placeholder }),
    ],
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 140, after: 0 },
  }));
  out.push(new Paragraph({
    children: [new TextRun({ text: org, font: 'Arial', size: 18, color: C.terracotta, italics: true })],
    spacing: { before: 20, after: bullets.length ? 40 : 0 },
  }));
  for (const b of bullets) {
    out.push(new Paragraph({
      numbering: { reference: 'cv-bullets', level: 0 },
      children: [new TextRun({ text: b, font: 'Georgia', size: 18, color: C.dark })],
      spacing: { before: 20, after: 0 },
    }));
  }
  return out;
}

// ── Education entry ───────────────────────────────────────────────────────────
function eduEntry(school, degree, period, skills = '') {
  const out = [];
  out.push(new Paragraph({
    children: [
      new TextRun({ text: school, font: 'Arial', size: 20, bold: true, color: C.dark }),
      new TextRun({ text: '\t' + period, font: 'Arial', size: 17, color: C.placeholder }),
    ],
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 140, after: 0 },
  }));
  out.push(new Paragraph({
    children: [new TextRun({ text: degree, font: 'Georgia', size: 18, color: C.muted, italics: true })],
    spacing: { before: 20, after: skills ? 30 : 0 },
  }));
  if (skills) {
    out.push(new Paragraph({
      children: [new TextRun({ text: skills, font: 'Arial', size: 16, color: C.terracotta })],
      spacing: { before: 0, after: 0 },
    }));
  }
  return out;
}

// ── Skills pill table (2 per row) ─────────────────────────────────────────────
function skillsTable(skills) {
  const colW = Math.floor(CW / 2);       // 5103
  const pillW = colW - 120;              // 4983  (outer cell margins 60 each side)

  function pillCell(text) {
    return new TableCell({
      borders: noBorders,
      width: { size: colW, type: WidthType.DXA },
      margins: { top: 50, bottom: 50, left: 60, right: 60 },
      children: [new Table({
        width: { size: pillW, type: WidthType.DXA },
        columnWidths: [pillW],
        borders: noBorders,
        rows: [new TableRow({ children: [new TableCell({
          borders: {
            top: terracottaBorder(6),
            bottom: terracottaBorder(6),
            left: terracottaBorder(6),
            right: terracottaBorder(6),
          },
          shading: { fill: C.terracottaLight, type: ShadingType.CLEAR },
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          width: { size: pillW, type: WidthType.DXA },
          children: [new Paragraph({
            children: [new TextRun({ text, font: 'Arial', size: 18, color: C.terracotta })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 0 },
          })],
        })]})],
      })],
    });
  }

  function emptyCell() {
    return new TableCell({
      borders: noBorders,
      width: { size: colW, type: WidthType.DXA },
      children: [new Paragraph({ children: [], spacing: { before: 0, after: 0 } })],
    });
  }

  const rows = [];
  for (let i = 0; i < skills.length; i += 2) {
    rows.push(new TableRow({
      children: [pillCell(skills[i]), i + 1 < skills.length ? pillCell(skills[i + 1]) : emptyCell()],
    }));
  }

  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [colW, CW - colW],
    borders: noBorders,
    rows,
  });
}

// ── Project card (Lifty) ──────────────────────────────────────────────────────
function projectCard() {
  const innerW = CW - 400; // account for outer cell left+right margins (200 each)
  const statW = Math.floor(innerW / 3);
  const statW3 = innerW - 2 * statW;

  function statCell(label, value, width) {
    return new TableCell({
      borders: noBorders,
      width: { size: width, type: WidthType.DXA },
      children: [new Paragraph({
        children: [
          new TextRun({ text: label + ': ', font: 'Arial', size: 16, bold: true, color: C.terracotta, allCaps: true }),
          new TextRun({ text: value, font: 'Georgia', size: 16, color: C.dark }),
        ],
        spacing: { before: 0, after: 0 },
      })],
    });
  }

  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    borders: noBorders,
    rows: [new TableRow({ children: [new TableCell({
      borders: {
        top: terracottaBorder(14),
        bottom: terracottaBorder(6),
        left: terracottaBorder(14),
        right: terracottaBorder(6),
      },
      shading: { fill: C.terracottaLight, type: ShadingType.CLEAR },
      margins: { top: 140, bottom: 140, left: 200, right: 200 },
      width: { size: CW, type: WidthType.DXA },
      children: [
        new Paragraph({
          children: [
            new TextRun({ text: 'LIFTY', font: 'Arial Black', size: 32, bold: true, color: C.terracotta }),
            new TextRun({ text: '   —   Motorised Bed-Making Assistive Device', font: 'Georgia', size: 20, color: C.dark, italics: true }),
          ],
          spacing: { before: 0, after: 80 },
        }),
        new Table({
          width: { size: innerW, type: WidthType.DXA },
          columnWidths: [statW, statW, statW3],
          borders: noBorders,
          rows: [new TableRow({ children: [
            statCell('Role', 'Product Designer + Engineer', statW),
            statCell('Timeline', 'Term 4, 2025 · SUTD', statW),
            statCell('Tools', 'Fusion 360 · Arduino · LionsBot SDK', statW3),
          ]})],
        }),
        new Paragraph({
          children: [new TextRun({
            text: 'Designed and built a motorised assistive device for elderly and physically limited users in collaboration with LionsBot International. Led the end-to-end product design process — user research, ideation, CAD modelling in Fusion 360, electronics wiring with Arduino, and physical prototyping.',
            font: 'Georgia', size: 18, color: C.dark,
          })],
          spacing: { before: 80, after: 0 },
        }),
      ],
    })]})],
  });
}

// ── Document ──────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [{
      reference: 'cv-bullets',
      levels: [{
        level: 0,
        format: 'bullet',
        text: '–',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 380, hanging: 240 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PW, height: PH },
        margin: { top: MT, bottom: MB, left: ML, right: MR },
      },
    },
    children: [

      // ── NAME HEADER ──────────────────────────────────────────────
      new Table({
        width: { size: CW, type: WidthType.DXA },
        columnWidths: [CW],
        borders: noBorders,
        rows: [new TableRow({ children: [new TableCell({
          borders: noBorders,
          shading: { fill: C.terracotta, type: ShadingType.CLEAR },
          margins: { top: 280, bottom: 180, left: 300, right: 300 },
          width: { size: CW, type: WidthType.DXA },
          children: [
            new Paragraph({
              children: [new TextRun({ text: 'KENDRIC TOH', font: 'Arial Black', size: 80, bold: true, color: C.white })],
              spacing: { before: 0, after: 60 },
            }),
            new Paragraph({
              children: [new TextRun({
                text: 'BSc Design & AI  ·  SUTD  ·  Product Design  ·  UX  ·  Engineering',
                font: 'Georgia', size: 20, italics: true, color: C.tagline,
              })],
              spacing: { before: 0, after: 0 },
            }),
          ],
        })]})],
      }),

      // ── CONTACT BAR ──────────────────────────────────────────────
      new Table({
        width: { size: CW, type: WidthType.DXA },
        columnWidths: [CW],
        borders: noBorders,
        rows: [new TableRow({ children: [new TableCell({
          borders: noBorders,
          shading: { fill: C.darkBrown, type: ShadingType.CLEAR },
          margins: { top: 90, bottom: 90, left: 300, right: 300 },
          width: { size: CW, type: WidthType.DXA },
          children: [new Paragraph({
            children: [
              new TextRun({ text: 'kendric.toh@gmail.com', font: 'Arial', size: 18, color: C.contactText }),
              new TextRun({ text: '   ·   ', font: 'Arial', size: 18, color: C.dividerDot }),
              new TextRun({ text: '(+65) 81265353', font: 'Arial', size: 18, color: C.contactText }),
              new TextRun({ text: '   ·   ', font: 'Arial', size: 18, color: C.dividerDot }),
              new TextRun({ text: 'Singapore', font: 'Arial', size: 18, color: C.contactText }),
              new TextRun({ text: '   ·   ', font: 'Arial', size: 18, color: C.dividerDot }),
              new TextRun({ text: 'linkedin.com/in/kendric-toh-338757212', font: 'Arial', size: 18, color: C.contactText }),
            ],
            spacing: { before: 0, after: 0 },
          })],
        })]})],
      }),

      spacer(12),

      // ── ABOUT ────────────────────────────────────────────────────
      sectionHeader('ABOUT'),
      spacer(8),
      new Paragraph({
        children: [new TextRun({
          text: 'Design & AI undergraduate at SUTD bridging human-centred design with engineering. Experienced in product design, CAD modelling, and hardware prototyping — open to product/UX design internships in Singapore.',
          font: 'Georgia', size: 20, color: C.dark,
        })],
        spacing: { before: 0, after: 0 },
      }),

      spacer(14),

      // ── SKILLS ───────────────────────────────────────────────────
      sectionHeader('SKILLS'),
      spacer(8),
      skillsTable([
        'Product Design',
        'UX Research',
        'Figma / Framer',
        'Fusion 360 / CAD',
        'AutoCAD',
        'Python',
        'Arduino / Electronics',
        'AI / ML',
      ]),

      spacer(14),

      // ── FEATURED PROJECT ─────────────────────────────────────────
      sectionHeader('FEATURED PROJECT'),
      spacer(8),
      projectCard(),

      spacer(14),

      // ── EXPERIENCE ───────────────────────────────────────────────
      sectionHeader('EXPERIENCE'),
      ...expEntry('Customer Success', 'Edgeline Planners', '2024 – Present'),
      ...expEntry('Vice President, Scratch Club', 'Singapore University of Technology and Design (SUTD)', '2024 – Present'),
      ...expEntry(
        'Assistant Electrical Engineer',
        'Keppel (Infrastructure Division)  ·  Internship',
        'Sep 2021 – Feb 2022',
        [
          'Developed engineering design documentation (P&ID, control systems, technical datasheets) for Waste-to-Energy infrastructure projects',
          'Assisted in tender preparation, compliance checks, and subcontractor deliverable review',
          'Supported project coordination and developed understanding of sustainable engineering in waste/wastewater systems',
        ]
      ),
      ...expEntry('Electronic Assembler', 'Hewlett Packard  ·  Part-time', 'Feb – May 2022'),
      ...expEntry(
        'Design Drafter',
        'The Wood Creation  ·  Part-time',
        'Jun 2020 – Jun 2025',
        [
          'Created 50+ 3D interior design models for residential clients using AutoCAD, Kujiale, and Photoshop',
          'Managed finance administration, client quotations, and supplier liaison',
        ]
      ),

      spacer(14),

      // ── EDUCATION ────────────────────────────────────────────────
      sectionHeader('EDUCATION'),
      ...eduEntry(
        'Singapore University of Technology and Design (SUTD)',
        'BSc Design & Artificial Intelligence (DAI)  ·  Freshmore Engineering Technology',
        'Sep 2024 – Aug 2028',
        'AutoCAD · Python · Fusion 360 · Product Design · AI / ML'
      ),
      ...eduEntry(
        'Singapore Polytechnic',
        'Diploma in Electrical and Electronics Engineering',
        '2019 – 2022',
        'Python · Machine Learning · Circuit Theory · Power Systems · PLC Applications'
      ),
      ...eduEntry(
        'Nanyang Academy of Fine Arts (NAFA)',
        'Certificate in Interior Design (3D Visualisation)',
        '2018 – 2019'
      ),

      spacer(14),

      // ── LANGUAGES ────────────────────────────────────────────────
      sectionHeader('LANGUAGES'),
      spacer(8),
      new Table({
        width: { size: CW, type: WidthType.DXA },
        columnWidths: [Math.floor(CW / 3), Math.floor(CW / 3), CW - 2 * Math.floor(CW / 3)],
        borders: noBorders,
        rows: [new TableRow({
          children: [
            ['English', 'Fluent'],
            ['Mandarin', 'Fluent'],
            ['Hokkien', 'Conversational'],
          ].map(([lang, level], i) => {
            const w = i < 2 ? Math.floor(CW / 3) : CW - 2 * Math.floor(CW / 3);
            return new TableCell({
              borders: noBorders,
              width: { size: w, type: WidthType.DXA },
              children: [new Paragraph({
                children: [
                  new TextRun({ text: lang, font: 'Arial', size: 20, bold: true, color: C.dark }),
                  new TextRun({ text: '  ' + level, font: 'Georgia', size: 18, color: C.muted, italics: true }),
                ],
                spacing: { before: 0, after: 0 },
              })],
            });
          }),
        })],
      }),

      spacer(8),

    ],
  }],
});

// ── Write file ────────────────────────────────────────────────────────────────
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('C:/Users/kendr/Desktop/portfolio/kendric_toh_cv.docx', buf);
  console.log('SUCCESS: CV written to kendric_toh_cv.docx');
}).catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
