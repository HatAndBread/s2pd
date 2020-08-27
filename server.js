const express = require('express');
const app = express();

app.use(express.static('src'));
app.use(express.json({ limit: '1mb' })); // FIX LIMIT!
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(req);
  res.sendFile(__dirname + '/index.html');
});

app.listen(3001);
