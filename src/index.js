const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const low = require('lowdb');

const app = express();

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ bookmarks: [] })
  .write()

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(morgan('combined'));

app.use('/api', require('./api/api.js'))

app.get('/', (req, res) => {
  res.send(db.get('bookmarks').value());
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});