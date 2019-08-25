'use strict';

const swapLocale =
    require('lighthouse/lighthouse-core/lib/i18n/swap-locale.js');
const renderer =
    require('lighthouse/lighthouse-core/report/report-generator.js');
const LOCALES = require('./locales.js');

const path = require('path');
const fs = require('fs');

// setup
var dir = path.join(__dirname + '/output/img/');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Get original json lhr
let json = fs.readFileSync('output/results.json');
let lhr = JSON.parse(json);

(async() => {
    for(let idx in LOCALES) {
        const locale = LOCALES[idx];
        console.log('Generating: ' + locale);
        // swaplocales
        const swappedLocale = swapLocale(lhr, locale);

        // generate html
        const html = renderer.generateReportHtml(swappedLocale.lhr);

        fs.writeFileSync(`output/img/report.${locale}.html`, html);
    }
})();

