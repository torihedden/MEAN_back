const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

let db = null;

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) {
    console.log(err);
  }
  db = client.db('meantest');
  // const collection = db.collection('users');
  // collection.find({}).toArray(function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(docs);
  //   }
  // })
  
  app.use(cors(corsOptions))
  app.use(express.json());
  app.use(express.urlencoded( { extended: true } ));

  let routes = require('./routes');
  routes(app, db);

  app.listen(8085);
  console.log('listening on port 8085');
})
