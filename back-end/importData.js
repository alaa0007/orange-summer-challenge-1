import express from "express";
import items from "./data/items.js";
import users from "./data/users.js";
import ItemModel from "./src/models/ItemModel.js";
import UserModel from "./src/models/UserModel.js";


const importedData = express.Router();

importedData.post("/users", async (req, res) => {
    const importUser = await UserModel.insertMany(users);
    res.send({ importUser })
}); 


importedData.post("/items", async (req, res) => {
    const importItem = await ItemModel.insertMany(items);
    res.send({ importItem })
}); 

export default importedData;