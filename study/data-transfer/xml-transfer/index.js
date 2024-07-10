const fs = require("fs");
const path = require("path");
const xmlParser = require("xml2json");

const xml = fs.readFileSync(path.join(__dirname, "a.xml"));
const xmlParsed = xmlParser.toJson(xml);

console.log(xmlParsed);
