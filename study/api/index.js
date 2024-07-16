const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const json = JSON.parse(
    fs.readFileSync("data.json", {
      encoding: "utf-8",
    })
  );
  const data = {
    name: json.name,
  };

  res.send(data);
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
