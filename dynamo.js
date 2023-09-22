import AWS from "aws-sdk";
import "dotenv/config";

export const PORT = 4000;

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  //,accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create the Service interface for dynamoDB
var dynamodb = new AWS.DynamoDB.DocumentClient();

//console.log(`region : ${process.env.AWS_DEFAULT_REGION}`);
//console.log(`accessKeyId : ${process.env.AWS_ACCESS_KEY_ID}`);
//console.log(`secretAccessKey : ${process.env.AWS_SECRET_ACCESS_KEY}`);

export const getCollection = async (collectionName) => {
  const params = {
    TableName: collectionName,
  };
  const data = await dynamodb.scan(params).promise();
  console.log("getCollectionData: ", data);
  return data;
};

export const getCollectionbyId = async (
  CollectionName,
  filter,
  filterValue
) => {
  const params = {
    TableName: CollectionName,
    FilterExpression: filter + " = :ftr",
    ExpressionAttributeValues: {
      ":ftr": filterValue,
    },
  };
  const data = await dynamodb.scan(params).promise();
  return data;
};

export const insertUser = (collectionName, itemObject, res) => {
  const params = {
    TableName: collectionName,
    Item: itemObject,
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Error adding item: ", err);
      res.status(500).json({ error: "Could not add item" });
    } else {
      console.log("User added successfully: ", data);
      res.json({ message: "User added successfully" });
    }
  });
};
