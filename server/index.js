const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

app.use(cors());

app.get("/", function (req, res) {
  res.send("Server is running perfectly!");
});

app.get("/:shortURL", async (req, res) => {
  const { shortURL } = req.params;

  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    const urlData = await collection.findOne({ shortURL });

    if (urlData) {
      const originalURL = urlData.originalURL;
      res.redirect(originalURL);
    } else {
      res.status(404).send("URL Data not found");
    }
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
});

app.listen(3001, function () {
  console.log(`Listening on port: 3000`);
});
