import AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v3",
  //   region: "us-east-1",
  //   accessKeyId: "AKIAWQJA6UKM2JWH27HK",
  //   secretAccessKey: "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",
});

// Create the Service interface for dynamoDB
var dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Locations";

// console.log(`region : ${process.env.AWS_DEFAULT_REGION}`);
// console.log(`accessKeyId : ${process.env.AWS_ACCESS_KEY_ID}`);
// console.log(`secretAccessKey : ${process.env.AWS_SECRET_ACCESS_KEY}`);

export const getLocations = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const Locationsdata = await dynamodb.scan(params).promise();
  console.log("Locationsdata: ", Locationsdata);
  return Locationsdata;
};
