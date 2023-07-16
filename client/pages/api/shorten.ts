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
      console.log("Data Found:", urlData);
      return urlData;
    } else {
      await collection.insertOne(dataObject);
      return dataObject;
    }
  } catch (error) {
    console.error("Error inserting data object:", error);
    return false;
  } finally {
    await client.close();
  }
};

// const run = async () => {
//   console.log(generateRandomString(5));

//   try {
//     const database = client.db("linkzar");
//     const linksCollection = database.collection("links");

//     const query = { originalURL: "https://ranaintizar.com" };
//     const link = await linksCollection.findOne(query);

//     return link;
//   } catch (err) {
//     console.log(err);
//   }
// };

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
