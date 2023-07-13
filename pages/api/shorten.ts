import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

client.connect((err: any) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
  console.log("Connected to MongoDB");
});

process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("MongoDB client disconnected");
    process.exit(0);
  });
});

const generateRandomString = (len: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const run = async () => {
  console.log(generateRandomString(5));

  try {
    const database = client.db("linkzar");
    const linksCollection = database.collection("links");

    const query = { originalURL: "https://ranaintizar.com" };
    const link = await linksCollection.findOne(query);

    return link;
  } catch (err) {
    console.log(err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = await run();
    res.send(data);
  } else {
    res.json({ error: "method is not found" });
    console.log("Method is not POST");
  }
};

export default handler;
