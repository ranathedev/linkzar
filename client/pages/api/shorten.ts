import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient } = require("mongodb");

import { generateRandomString } from "lib/utils";

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

    if (urlData) {
      const response = {
        originalURL: urlData.originalURL,
        shortURL: `http://localhost:3001/${urlData.shortURL}`,
      };
      return response;
    } else {
      await collection.insertOne(dataObject);
      const response = {
        originalURL: dataObject.originalURL,
        shortURL: `http://localhost:3001/${dataObject.shortURL}`,
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
    const shortURL = generateRandomString(5);
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
