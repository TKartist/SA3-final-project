const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongodb_uri = 'mongodb://localhost:27017';
const db_name = 'final-project';

const client = new MongoClient(mongodb_uri);

const collection_name = ['data-users', 'moves'];

const model = {};

console.log("Connecting to mongodb server");

client
  .connect()
  .then(async client => {
    console.log("Connected to mongodb server" + mongodb_uri);
    model.db = client.db(db_name);
    collection_name.forEach(c=> {
      model[c] =  model.db.collection(c);
    }) 
  })
  .catch(err => console.error(err));

exports.model = model;