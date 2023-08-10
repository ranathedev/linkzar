const insertDataObject = async (client, dataObject) => {
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

const deleteLink = async (client, originalURL) => {
  try {
    await client.connect();
    const database = client.db("linkzar");
    const collection = database.collection("links");

    await collection.deleteOne({ originalURL });
    return "Short URL Deleted successfully!";
  } catch (error) {
    console.log("Error deleting link:", error);
    return false;
  } finally {
    client.close();
  }
};

module.exports = {
  insertDataObject,
  deleteLink,
};
