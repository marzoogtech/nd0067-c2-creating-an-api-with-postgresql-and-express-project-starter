"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_SECRET } = process.env;
const auth = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, TOKEN_SECRET + '');
    if (!decoded) {
        throw new Error('Error when decoding the token');
    }
    req.userId = decoded.user.userId;
    req.firstName = decoded.user.firstName;
    req.lastName = decoded.user.lastName;
    next();
};
exports.auth = auth;
