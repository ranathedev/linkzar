const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { insertDataObject, deleteLink } = require("./module.js");

const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("@fastify/cors"), {});

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

fastify.get("/", async (req, res) => {
  res.redirect("https://linkzar.ranainitzar.com");

  // get All Documents
  // await client.connect();
  // const database = client.db("linkzar");
  // const collection = database.collection("links");

  // const cursor = collection.find();

  // const allDocuments = await cursor.toArray();

  // res.send({ allDocuments: allDocuments });
});

fastify.post("/api/shorten", async (req, res) => {
  const url = req.body.url;
  const shortURL = req.body.shortURL;
  const dataObject = { shortURL, originalURL: url };
  const response = await insertDataObject(client, dataObject);
  response ? res.send(response) : res.send({ error: "This is error message." });
});

fastify.post("/api/deleteLink", async (req, res) => {
  const originalURL = req.body.originalURL;
  const response = await deleteLink(client, originalURL);
  res.send(response);
});

fastify.post("/api/editLink", async (req, res) => {
  const documentId = req.body.id;

  console.log("docId:", documentId);

  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    const filter = { _id: new ObjectId(documentId) };

    const updateOperation = {
      $set: {
        shortURL: "videos",
      },
    };

    const updateResult = await collection.updateOne(filter, updateOperation);

    console.log(updateResult);

    if (updateResult.modifiedCount === 1) {
      console.log("Document updated successfully");
    } else {
      console.log("Document not found or not updated");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
});

fastify.get("/:shortURL", async (req, res) => {
  const shortURL = req.params.shortURL;

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

fastify.listen({ port: 3001, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
});
