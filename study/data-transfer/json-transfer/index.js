const fs = require("fs");
const path = require("path");

const json = fs.readFileSync(path.join(__dirname, "a.json"));
const jsonParsed = JSON.parse(json);

console.log(jsonParsed);
