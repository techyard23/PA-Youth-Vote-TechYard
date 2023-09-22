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
const TABLE_NAME = "Locations";

//console.log(`region : ${process.env.AWS_DEFAULT_REGION}`);
//console.log(`accessKeyId : ${process.env.AWS_ACCESS_KEY_ID}`);
//console.log(`secretAccessKey : ${process.env.AWS_SECRET_ACCESS_KEY}`);

export const getLocations = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const Locationsdata = await dynamodb.scan(params).promise();
  console.log("Locationsdata: ", Locationsdata);
  return Locationsdata;
};

export const getbyId = async (tableName, filter, filterValue) => {
  const params = {
    TableName: tableName,
    FilterExpression: filter + " = :ftr",
    ExpressionAttributeValues: {
      ":ftr": filterValue,
    },
  };
  const data = await dynamodb.scan(params).promise();
  return data;
};
