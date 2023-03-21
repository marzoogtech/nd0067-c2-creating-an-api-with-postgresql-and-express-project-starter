"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = new User_1.UserModel();
const { TOKEN_SECRET } = process.env;
const index = async (req, res) => {
    try {
        const users = await User.index();
        res.send(users);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.show(id);
        res.send(user);
    }
    catch (err) {
        res.status(404).json(err);
    }
};
exports.show = show;
const create = async (req, res) => {
    try {
        const { id, firstName, lastName, password } = req.body;
        if (!id || !firstName || !lastName || !password) {
            res
                .status(400)
                .send(`Error, missing or malformed parameters. (id, firstName, lastName, password) must be provied.`);
        }
        const user = { id, firstName, lastName, password };
        const createdUser = await User.create(user);
        const token = jsonwebtoken_1.default.sign({ user: { userId: user.id, firstName: user.firstName, lastName: user.lastName } }, TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(500).send(`Faild to creat user. Error ${err}`);
    }
};
exports.create = create;
