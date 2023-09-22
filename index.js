import express from "express";
import { getLocations, getbyId } from "./dynamo.js";

const app = express();

const PORT = 4000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Success: App is listening this port: ${PORT}`);
});

app.get("/getLocations", async (request, response) => {
  const locationData = await getLocations();
  response.status(201).send(locationData);
});

app.get("/getLocations/:pincode", async (request, response) => {
  const { pincode } = request.params;
  const locationData = await getbyId("Locations", "Pincode", pincode);
  response.status(201).send(locationData);
});

app.get("/testapi", (request, response) => {
  response.status(201).send({ Team: "Techyard" });
});
