import express from "express";
import { PORT } from "./config.js";
import AWS from "aws-sdk";
import { getLocations } from "./dynamo.js";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Success: App is listening this port: ${PORT}`);
});

app.get("/", (request, response) => {
  const locationData = getLocations();
  response.status(201).send(locationData);
});

app.get("/testapi", (request, response) => {
  response.status(201).send({ Team: "Techyard" });
});
