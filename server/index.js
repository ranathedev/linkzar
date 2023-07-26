const { MongoClient } = require("mongodb");
require("dotenv").config();

const fastify = require("fastify")({
  logger: false,
});

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

fastify.get("/", function (req, res) {
  const protocol = req.protocol;

  // Get the hostname (e.g., localhost or example.com)
  const hostname = req.hostname;

  // Get the full URL path (e.g., /example?param=value)
  const fullPath = req.raw.url;

  // Concatenate the parts to get the full URL
  const fullUrl = `${protocol}://${hostname}${fullPath}`;

  console.log("Server url is:", fullUrl);
  res.send("Server is running perfectly!");
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
