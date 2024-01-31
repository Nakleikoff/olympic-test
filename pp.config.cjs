const indexSections = [
  {section: 'header', misMatchThreshold: 1},
  {section: 'main', misMatchThreshold: 1},
  {section: 'footer', misMatchThreshold: 1}
];

const files = ['index'/*, 'index-open-sans', 'index-inter'*/]

const referencePath = `${__dirname}/reference/`;

module.exports = {
  "id": "olympic-test-pp",
  "viewports": [
    {
      "label": "desktop",
      "width": 1440,
      "height": 800,
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 800,
    },
    {
      "label": "mobile",
      "width": 375,
      "height": 800,
    },
  ],
  "onReadyScript": "onReady.cjs",
  "onBeforeScript": "onBefore.cjs",
  "resembleOutputOptions": {
    "ignoreAntialiasing": true
  },
  "scenarios": files.flatMap(file => [
    ...indexSections.map(({section, misMatchThreshold}) => ({
      label: `${section} ${file}`,
      url: `http://localhost:3000/${file}.html`,
      referenceUrl: `file:///${referencePath}${file}.html`,
      selectors: [`[data-test="${section}"]`],
      misMatchThreshold: misMatchThreshold || 5,
      requireSameDimensions: true,
      delay: 500
    })),
    ...indexSections.map(({section, misMatchThreshold}) => ({
      label: `${section} ${file} content overflow`,
      url: `http://localhost:3000/${file}.html`,
      referenceUrl: `file:///${referencePath}${file}-overflow.html`,
      selectors: [`[data-test="${section}"]`],
      misMatchThreshold: misMatchThreshold || 5,
      requireSameDimensions: true,
      delay: 500,
      onReadyScript: `${section}Overflow.cjs`,
    })),
  ]),
  fileNameTemplate: '{scenarioLabel}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
    "json_report": "backstop_data/json_report",
  },
  "report": ["browser", "json"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"],
    "gotoParameters": {"waitUntil": ["load", "networkidle0"], timeout: 20000},
  },
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
