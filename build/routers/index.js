"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("../controller"));
// videos api connect
router.get('/videos', controller_1.default.videos.getVideos);
router.post('/videos', controller_1.default.videos.addVideos);
router.put('/videos', controller_1.default.videos.putVideos);
router.delete('/videos', controller_1.default.videos.deleteVideos);
// videos api connect
router.get('/users', controller_1.default.users.getAllUsers);
router.post('/user', controller_1.default.users.addUser);
router.put('/user', controller_1.default.users.putUser);
router.delete('/user', controller_1.default.users.deleteUser);
// basic menu api connect
// router.get('/basicMenu', constroller.basicMenu.getBasicMenu);
// router.post('/basicMenu', constroller.basicMenu.addBasicMenu);
// router.put('/basicMenu', constroller.basicMenu.putBasicMenu);
// router.delete('/basicMenu', constroller.basicMenu.deleteBasicMenu);
// sub menu api connect
// router.get('/subMenu', constroller.subMenu.getSubMenu);
// router.post('/subMenu', constroller.subMenu.addSubMenu);
// router.put('/subMenu', constroller.subMenu.putSubMenu);
// router.delete('/subMenu', constroller.subMenu.deleteSubMenu);
exports.routers = router;
