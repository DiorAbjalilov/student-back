"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const routers_1 = require("./routers");
const path_1 = __importDefault(require("path"));
const pathdir = path_1.default.join(__dirname, '/upload');
// express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// public routes
app.use('/upload', express_1.default.static(pathdir));
// parse application/json
app.use(body_parser_1.default.json());
// dot env file config
dotenv_1.default.config();
// connect mongoodb
(0, db_1.connectDB)();
// dotenv port connect
const PORT = process.env.PORT || 5000;
app.use('/api', routers_1.routers);
app.listen(PORT, () => {
    console.log('======== * SERVER RUNING * =======');
    console.log(`Express server runing on port ${PORT}`);
});
