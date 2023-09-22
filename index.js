import express from "express";
import { getCollection, getCollectionbyId, insertUser } from "./dynamo.js";

const app = express();

const PORT = 4000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Success: App is listening this port: ${PORT}`);
});

app.get("/getLocations", async (request, response) => {
  const locationData = await getCollection("Locations");
  response.status(201).send(locationData);
});

app.get("/getLocations/:pincode", async (request, response) => {
  const { pincode } = request.params;
  const locationData = await getCollectionbyId("Locations", "Pincode", pincode);
  response.status(201).send(locationData);
});

app.post("/adduser", async (request, response) => {
  const userParam = {
    UserId: "101",
    FirstName: request.body.FirstName,
    LastName: request.body.LastName,
    Email: request.body.Email,
    Address: request.body.Address,
    City: request.body.City,
    State: request.body.State,
    Country: request.body.Country,
    Pincode: request.body.Pincode,
    DOB: request.body.DOB,
  };
  insertUser("Users", userParam, response);
});

app.get("/testapi", (request, response) => {
  response.status(201).send({ Team: "Techyard" });
});

app.get("/getUsers", async (request, response) => {
  const data = await getCollection("Users");
  response.status(201).send(data);
});
