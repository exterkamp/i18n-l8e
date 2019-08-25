const express = require('express');
const app = express();
var path = require('path');
const LOCALES = require('../locales.js');
const ISO6391 = require('iso-639-1');

// set the views path
app.set('views', path.join(__dirname, '/views'));

app.get('/i18n/:locale', function (req, res) {
    res.sendFile(path.join(__dirname + `/../output/img/report.${req.params.locale}.html`));
})

app.get('/', (req, res) => {
  const locales = [];

  for(let idx in LOCALES) {
    const locale = LOCALES[idx];

    let localeText = locale;

    if (ISO6391.getName(locale)) {
      localeText = ISO6391.getName(locale) + ` (${locale})`;
    }

    locales.push({
      text:  localeText,
      href: `./i18n/${locale}`,
    });
  }

  res.render('index.ejs', {
    locales: locales,
  });
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});