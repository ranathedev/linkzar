const { MongoClient } = require("mongodb");
require("dotenv").config();
const {
  createCollection,
  deleteCollection,
  getLinks,
  insertDataObject,
  deleteLink,
  editLink,
} = require("./module.js");

const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("@fastify/cors"), {});

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

fastify.get("/", async (req, res) => {
  res.redirect("https://linkzar.ranaintizar.com");
});

fastify.post("/api/getLinks", async (req, res) => {
  const uid = req.body.uid;
  const response = await getLinks(client, uid);
  res.send(response);
});

fastify.post("/createColl", async (req, res) => {
  const uid = req.body.uid;
  await createCollection(client, uid, res);
});

fastify.post("/deleteColl", async (req, res) => {
  const uid = req.body.uid;
  await deleteCollection(client, uid, res);
});

fastify.post("/api/shorten", async (req, res) => {
  const uid = req.body.uid;
  const url = req.body.url;
  const shortId = req.body.shortId;
  const dataObject = { shortId, originalURL: url };
  const response = await insertDataObject(client, dataObject, uid);
  response ? res.send(response) : res.send({ err: "Unexpected error occured" });
});

fastify.post("/api/deleteLink", async (req, res) => {
  const uid = req.body.uid;
  const id = req.body.id;
  const response = await deleteLink(client, id, uid);
  res.send(response);
});

fastify.post("/api/editLink", async (req, res) => {
  const uid = req.body.uid;
  const documentId = req.body.id;
  const newValue = req.body.value;
  const response = await editLink(client, documentId, newValue, uid);
  res.send(response);
});

fastify.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    await client.connect();
    const database = client.db("linkzar");
    const userCollections = database.listCollections();

    while (await userCollections.hasNext()) {
      const collectionInfo = await userCollections.next();
      const userCollection = database.collection(collectionInfo.name);

      const urlData = await userCollection.findOne({ shortId });

      if (urlData) {
        await userCollection.updateOne(
          { _id: urlData._id },
          { $inc: { clickCounts: 1 } }
        );

        const originalURL = urlData.originalURL;
        res.redirect(originalURL);
        return;
      }
    }

    res.status(404).send("URL Data not found");
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
