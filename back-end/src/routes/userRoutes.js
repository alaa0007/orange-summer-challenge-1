import express from 'express';
import users from '../../data/users.js';

const UserRoute = express.Router();

// LOAD ALL USERS
UserRoute.get("/api/users", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(users);
});

// LOAD A SINGLE USER
UserRoute.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = Users.find(user => user.id == userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});


export default UserRoute;