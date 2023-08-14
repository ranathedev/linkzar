const { ObjectId } = require("mongodb");

const insertDataObject = async (client, dataObject) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    const urlData = await collection.findOne({
      originalURL: dataObject.originalURL,
    });

    const shortLink = await collection.findOne({
      shortId: dataObject.shortId,
    });

    if (urlData) {
      return urlData;
    } else if (shortLink) {
      const response = { err: "This alias is taken" };
      return response;
    } else {
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

const deleteLink = async (client, id) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    console.log(id);

    const filter = { _id: new ObjectId(id) };
    const deleteResult = await collection.deleteOne(filter);

    if (deleteResult.deletedCount === 1) {
      return "Link deleted successfully!";
    } else {
      return { Error: "While deleting link." };
    }
  } catch (error) {
    console.log("Error deleting link:", error);
  } finally {
    client.close();
  }
};

const editLink = async (client, id, newValue) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    const filter = { _id: new ObjectId(id) };

    const updateOperation = {
      $set: {
        shortId: newValue,
      },
    };

    const updateResult = await collection.updateOne(filter, updateOperation);

    if (updateResult.modifiedCount === 1) {
      const updatedDoc = await collection.findOne({
        _id: new ObjectId(id),
      });

      if (updatedDoc) {
        return updatedDoc;
      } else {
        return "Updated document not found";
      }
    } else {
      console.log("Document not found or not updated");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
  }
};

module.exports = {
  insertDataObject,
  deleteLink,
  editLink,
};
