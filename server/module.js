const { ObjectId } = require("mongodb");

const createCollection = async (client, uid, res) => {
  try {
    await client.connect();
    const database = client.db("linkzar");

    await database.createCollection(uid);

    res.send({ message: "User collection created." }).status(200);
    console.log("Collection created.");
  } catch (error) {
    console.error("Error creating user collection:", error);
    res.send({ error: "Internal Server Error" }).status(500);
  } finally {
    await client.close();
  }
};

const deleteCollection = async (client, uid, res) => {
  try {
    await client.connect();
    const database = client.db("linkzar");

    await database.dropCollection(uid);

    res.send({ message: "User collection deleted." }).status(200);
    console.log("Collection Deleted.");
  } catch (error) {
    console.error("Error deleting user collection:", error);
    res.send({ error: "Internal Server Error" }).status(500);
  } finally {
    await client.close();
  }
};

const getLinks = async (client, uid) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection(uid);

    const cursor = collection.find();
    const allDocuments = await cursor.toArray();

    return allDocuments;
  } catch (error) {
    return { err: error };
  }
};

const insertDataObject = async (client, dataObject, uid) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection(uid);

    const urlData = await collection.findOne({
      originalURL: dataObject.originalURL,
    });

    const shortLink = await collection.findOne({
      shortId: dataObject.shortId,
    });

    if (urlData) {
      return urlData;
    } else if (shortLink) {
      return { err: "This alias is already taken" };
    } else {
      dataObject.clickCounts = 0;
      dataObject.createdDate = new Date();

      const addedDoc = await collection.insertOne(dataObject);
      const docId = addedDoc.insertedId;

      const filter = { _id: new ObjectId(docId) };
      const document = await collection.findOne(filter);

      return document;
    }
  } catch (error) {
    console.error("Error inserting data object:", error);
    return false;
  } finally {
    await client.close();
  }
};

const deleteLink = async (client, id, uid) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection(uid);

    const filter = { _id: new ObjectId(id) };
    const deleteResult = await collection.deleteOne(filter);

    if (deleteResult.deletedCount === 1) {
      return true;
    } else {
      return { err: "Error: Can't delete link." };
    }
  } catch (error) {
    console.log("Error deleting link:", error);
  } finally {
    client.close();
  }
};

const editLink = async (client, id, newValue, uid) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection(uid);

    const filter = { _id: new ObjectId(id) };

    const prevDoc = await collection.findOne(filter);

    if (prevDoc.shortId == newValue) {
      return prevDoc;
    } else {
      const shortLink = await collection.findOne({
        shortId: newValue,
      });

      if (shortLink) {
        return { error: "Error: Alias is already taken." };
      } else {
        const updateOperation = {
          $set: {
            shortId: newValue,
          },
        };

        const updateResult = await collection.updateOne(
          filter,
          updateOperation
        );

        if (updateResult.modifiedCount === 1) {
          const updatedDoc = await collection.findOne({
            _id: new ObjectId(id),
          });

          if (updatedDoc) {
            return updatedDoc;
          }
        } else {
          return { err: "Error: Can't update the Link." };
        }
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
};

module.exports = {
  createCollection,
  deleteCollection,
  getLinks,
  insertDataObject,
  deleteLink,
  editLink,
};
