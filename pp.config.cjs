const indexSections = [
  {section: 'header', misMatchThreshold: 2},
  {section: 'main', misMatchThreshold: 2},
  {section: 'footer', misMatchThreshold: 2}
];

const files = ['index', 'index-open-sans', 'index-inter']


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
    "ignoreAntialiasing": true,
    "errorType": "movementDifferenceIntensity",
    "transparency": 0.3,
    scaleToSameSize: false
  },
  "scenarios": files.flatMap(file => [
    ...indexSections.map(({section, misMatchThreshold}) => ({
      "label": `${section} ${file}`,
      "url": `http://localhost:3000/${file}.html`,
      selectors: [`[data-test="${section}"]`],
      misMatchThreshold: misMatchThreshold || 5,
      requireSameDimensions: true,
      delay: 500
    })),
    ...indexSections.map(({section, misMatchThreshold}) => ({
      "label": `${section} ${file} content overflow`,
      "url": `http://localhost:3000/${file}.html`,
      selectors: [`[data-test="${section}"]`],
      misMatchThreshold: misMatchThreshold || 5,
      requireSameDimensions: true,
      delay: 500,
      onReadyScript: `${section}Overflow.cjs`,
    })),
  ]),
  fileNameTemplate: '{scenarioLabel}_{viewportLabel}',
  "paths": {
    "bitmaps_reference": "bitmaps_reference/test-pp",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "backstop_data/html_report",
    "json_report": "backstop_data/json_report",
  },
  "report": ["browser", "json"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox", "--disable-font-subpixel-positioning", "--font-render-hinting=none"],
    "gotoParameters": {"waitUntil": ["load", "networkidle0"], timeout: 20000},
  },
  "asyncCaptureLimit": 10,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
