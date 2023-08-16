const { MongoClient } = require("mongodb");
require("dotenv").config();
const { insertDataObject, deleteLink, editLink } = require("./module.js");

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
  const shortId = req.body.shortId;
  const dataObject = { shortId, originalURL: url };
  const response = await insertDataObject(client, dataObject);
  response ? res.send(response) : res.send({ err: "Unexpected error occured" });
});

fastify.post("/api/deleteLink", async (req, res) => {
  const id = req.body.id;
  const response = await deleteLink(client, id);
  res.send(response);
});

fastify.post("/api/editLink", async (req, res) => {
  const documentId = req.body.id;
  const newValue = req.body.value;
  const response = await editLink(client, documentId, newValue);
  res.send(response);
});

fastify.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    const urlData = await collection.findOne({ shortId });

    if (urlData) {
      await collection.updateOne(
        { _id: urlData._id },
        { $inc: { clickCounts: 1 } }
      );

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
