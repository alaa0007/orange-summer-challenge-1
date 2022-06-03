
import express from "express"

const routerItem = express.Router();

// LOAD ALL ITEMS
routerItem.get("/api/items", (req, res) => {
    res.json(items);
});

// LOAD A SINGLE ITEMS
routerItem.get("/api/items/:id", (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id == itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// ADD A NEW ITEM
routerItem.post("/api/items", (req, res) => {  
    const newItem = {
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
routerItem.put("/api/items/:id", (req, res) => {
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
routerItem.delete("/api/items/:id", (req, res) => {
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