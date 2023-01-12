const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME || "22-04-kurs";

let dbReference = null; // singleton pattern

// falsy values = null, undefined, "", 0, NaN, false
// truthy values = 1, "string", {}, [], { key: "value" }, true
function getDB() {
  if (dbReference) {
    return Promise.resolve(dbReference);
  } else {
    console.log("Connecting to database for first time...", url);
    const client = new MongoClient(url);
    return client
      .connect()
      .then((connectedClient) => connectedClient.db(dbName))
      .then((db) => {
        dbReference = db; // DATENBANK-REFERENZ ZWISCHENSPEICHERN!!!!!!!!!!
        return dbReference;
      });
  }
}

module.exports = {
  getDB,
};
