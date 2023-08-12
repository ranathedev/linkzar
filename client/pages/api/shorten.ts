import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://linkzar:${process.env.MONGO_KEY}@linkzar-cluster.2wcn1ji.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const insertDataObject = async (dataObject: {
  shortURL: string;
  originalURL: string;
}) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    const urlData = await collection.findOne({
      originalURL: dataObject.originalURL,
    });

    const shortLink = await collection.findOne({
      shortURL: dataObject.shortURL,
    });

    if (urlData) {
      const response = {
        originalURL: urlData.originalURL,
        shortURL: `https://urlzar.glitch.me/${urlData.shortURL}`,
      };
      return response;
    } else if (shortLink) {
      const response = { err: "This alias is taken" };
      return response;
    } else {
      await collection.insertOne(dataObject);
      const response = {
        originalURL: dataObject.originalURL,
        shortURL: `http://urlzar.glitch.me/${dataObject.shortURL}`,
      };
      return response;
    }
  } catch (error) {
    console.error("Error inserting data object:", error);
    return false;
  } finally {
    await client.close();
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const url = req.body.url;
    const shortURL = req.body.shortURL;
    const dataObject = { shortURL, originalURL: url };
    const response = await insertDataObject(dataObject);
    response
      ? res.send(response)
      : res.send({ error: "This is error message." });
  } else {
    res.json({ error: "method is not found" });
    console.log("Method is not POST");
  }
};

export default handler;
