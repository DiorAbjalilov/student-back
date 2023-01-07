"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const user_1 = __importDefault(require("../models/user"));
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.find();
        yield res.status(200).json({ success: true, data: result, error: false });
    }
    catch (error) {
        yield res.status(501).json({ success: false, data: [], error: error });
        console.log(error);
    }
});
// add new user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, type, avatar } = req.body;
        const result = new user_1.default({
            name,
            description,
            type,
            avatar
        });
        yield result.save().then(() => {
            res.status(201).json({ seccuss: true, data: result, error: false });
        });
    }
    catch (error) {
        console.log(error);
        yield res.status(501).json({ success: false, data: [], error: error });
    }
});
// update old user
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const isUser = yield user_1.default.findById({ _id: id });
        if (!!isUser) {
            Object.assign(isUser, req.body);
            yield isUser
                .save()
                .then(() => {
                res
                    .status(200)
                    .json({ success: true, data: isUser, message: 'user updated' });
            })
                .catch((error) => {
                res.status(400).json({ success: false, data: [], message: error });
            });
        }
        yield res
            .status(404)
            .json({ success: false, data: [], message: 'user not found' });
    }
    catch (error) {
        yield res.status(400).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// delete one user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const isUser = yield user_1.default.findByIdAndDelete({ _id: id });
        if (!!isUser) {
            yield res
                .status(200)
                .json({ success: true, data: [], message: 'user deleted' });
        }
        else {
            yield res
                .status(401)
                .json({ success: false, data: [], message: 'user not found' });
        }
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
exports.users = {
    getAllUsers,
    addUser,
    putUser,
    deleteUser
};
