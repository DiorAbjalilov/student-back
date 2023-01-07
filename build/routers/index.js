"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("../controller"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/upload');
    },
    filename: function async(req, file, cb) {
        let type = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}-photo.${type}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/register', controller_1.default.usersController.registrUser);
router.post('/login', controller_1.default.usersController.loginUser);
router.put('/updateUser', upload.single('avatar'), auth_1.verifyToken, controller_1.default.usersController.updateOneUser);
exports.routers = router;
