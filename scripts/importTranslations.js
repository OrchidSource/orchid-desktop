/**
 * Imports translations from the CSV output from the Google Spreadsheet that lives here:
 *
 * https://docs.google.com/spreadsheets/d/1Nm10JF2oqftGZbre658UB935_ErB8HeGZ18eHffthZw/
 */
const csv = require('node-csv');
var fs = require('fs');
var parser = csv.createParser();


var languages = {};

const INPUT_FILE_NAME = './translations.csv';

if (!fs.existsSync(INPUT_FILE_NAME)) {
  console.error(`Input file "${INPUT_FILE_NAME}" does not exist. Please export from https://docs.google.com/spreadsheets/d/1Nm10JF2oqftGZbre658UB935_ErB8HeGZ18eHffthZw and place in the root of the project directory.`);

}

parser.mapFile(INPUT_FILE_NAME, function(err, data) {
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    for (let key in row) {
      let match = key.match(/^translation:([a-z]{2})/);
      // debugger;
      if (match !== null) {
        languages[match[1]] = languages[match[1]] || {};

        add_value(languages[match[1]], row['Translation key'].split('.'), row[key]);
      }
    }
  }
  for (let key in languages) {
    let fileName = './src/assets/translations/' + key + '.json';
    console.log("Writing file: " + fileName);
    fs.writeFile(fileName, JSON.stringify(languages[key]), 'utf8', () => {});
  }

});

function add_value(key_root, key_array, value) {
  if (key_array.length === 1) {
    key_root[key_array[0]] = value;
  } else {
    key_root[key_array[0]] = key_root[key_array[0]] || {};
    add_value(key_root[key_array[0]], key_array.slice(1), value);
  }
}