import express from "express";
//import { PORT } from "./config.js";
import { getLocations } from "./dynamo.js";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Success: App is listening this port: ${PORT}`);
});

app.get("/getLocations", (request, response) => {
  const locationData = getLocations();
  response.status(201).send(locationData);
});

app.get("/testapi", (request, response) => {
  response.status(201).send({ Team: "Techyard" });
});
