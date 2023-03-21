"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("./api/products"));
const users_1 = __importDefault(require("./api/users"));
const orders_1 = __importDefault(require("./api/orders"));
const router = (0, express_1.Router)();
router.use('/products', products_1.default);
router.use('/users', users_1.default);
router.use('/orders', orders_1.default);
exports.default = router;
