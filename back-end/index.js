import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/Config/dataBaseConfig.js';
import users from './data/users.js';
import items from './data/items.js';
import cors from 'cors';

dotenv.config();
connectDB()
const app = express();
app.use(cors());

// LOAD ALL USERS
app.get("/api/users", (req, res) => {
    res.json(users);
});

// LOAD A SINGLE USER
app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// add a new user
app.post("/api/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isManager: req.body.isManager
    }
    users.push(newUser);
    res.json(newUser);
});

// update a user
app.put("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);
    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.isManager = req.body.isManager;
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// delete a user
app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);
    if (user) {
        const index = users.indexOf(user);
        users.splice(index, 1);
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});



/******************Item ********************************************************/


// LOAD ALL ITEMS

app.get("/api/items", (req, res) => {
    res.json(items);
});

// LOAD A SINGLE ITEMS
app.get("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id == itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// ADD A NEW ITEM
app.post("/api/items", (req, res) => {  
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        userId: req.body.userId,
        image: req.body.image
    }
    items.push(newItem);
    res.json(newItem);
});

// UPDATE A ITEM
app.put("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id == itemId);
    if (item) {
        item.name = req.body.name;
        item.price = req.body.price;
        item.description = req.body.description;
        item.userId = req.body.userId;
        item.image = req.body.image;
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// DELETE A ITEM
app.delete("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id == itemId);
    if (item) {
        const index = items.indexOf(item);
        items.splice(index, 1);
        res.json(item);
        
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});