import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const deleteLink = async (originalURL: string) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    await collection.deleteOne({ originalURL });
    return true;
  } catch (error) {
    console.log("Error deleting link:", error);
    return false;
  } finally {
    client.close();
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const originalURL = req.body.originalURL;
    const response = await deleteLink(originalURL);
    res.send(response);
  } else {
    res.json({ error: "method is not found" });
  }
};

export default handler;
