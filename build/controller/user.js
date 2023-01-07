"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.usersController = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("../config/config");
// post registration new user || POST request || TOKEN response
const registrUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, phone } = req.body;
        if (firstName && lastName && password && phone) {
            const isUser = yield user_1.default.findOne({ phone });
            if (!!isUser) {
                return res.status(400).json({
                    success: false,
                    data: [],
                    message: "Bu telfon raqam ro'yxatdan o'tgan"
                });
            }
            const newUser = yield new user_1.default({
                firstName,
                lastName,
                password,
                phone
            });
            newUser.save();
            yield res.status(201).json({
                success: true,
                data: newUser,
                message: "Ro'yxatdan o'tdingiz"
            });
        }
        else {
            res.status(400).json({
                success: false,
                data: [],
                message: "Kechirasiz ma'lumotlar to'liq emas"
            });
        }
    }
    catch (error) {
        console.log(error);
        yield res.status(501).json({ success: false, data: [], message: error });
    }
});
// post login user || POST request || TOKEN response
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, phone } = req.body;
        if (password && phone) {
            const isUser = yield user_1.default.findOne({ phone }).select(['+password']);
            if (!isUser) {
                return res.status(400).json({
                    success: false,
                    data: [],
                    message: "Bu telfon raqam ro'yxatdan o'tmagan"
                });
            }
            const isPasswordCorrect = yield bcrypt.compareSync(JSON.stringify(password), isUser.password);
            if (!!isPasswordCorrect) {
                const payload = { subject: isUser._id };
                const token = jsonwebtoken_1.default.sign(payload, config_1.Config.JWT_SECRET);
                return res.status(200).json({
                    success: true,
                    data: { user: isUser, token },
                    message: ''
                });
            }
            yield res.status(404).json({
                success: false,
                data: [],
                message: 'Kechirasiz Telfon raqam yoki parol xato'
            });
        }
        yield res.status(404).json({
            success: false,
            data: [],
            message: "Kechirasiz ma'lumotlar to'liq emas"
        });
    }
    catch (error) {
        console.log(error);
        yield res.status(501).json({ success: false, data: [], message: error });
    }
});
// update user || PUT request || By ID || TOKEN request
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phone, birthDay, sex, address } = req.body;
        // @ts-ignore
        const photoPath = req.file.path;
        console.log(photoPath);
        // @ts-ignore
        const _id = req.auth.subject;
        const isUser = yield user_1.default.findById({ _id });
        if (!!isUser) {
            isUser.firstName = firstName !== null && firstName !== void 0 ? firstName : isUser.firstName;
            isUser.lastName = lastName !== null && lastName !== void 0 ? lastName : isUser.lastName;
            isUser.phone = phone !== null && phone !== void 0 ? phone : isUser.phone;
            isUser.avatar = photoPath !== null && photoPath !== void 0 ? photoPath : isUser.avatar;
            isUser.birthDay = birthDay !== null && birthDay !== void 0 ? birthDay : isUser.birthDay;
            isUser.sex = sex !== null && sex !== void 0 ? sex : isUser.sex;
            isUser.address = address !== null && address !== void 0 ? address : isUser.address;
            yield isUser.save();
            yield res.status(200).json({
                success: true,
                data: isUser,
                message: "Ma'lumotlar o'zgartirildi"
            });
        }
        yield res.status(404).json({
            success: false,
            data: [],
            message: ''
        });
    }
    catch (error) {
        yield res.status(400).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// delete user || DELETE request || By ID || TOKEN request
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// get all users || GET request || Admin request || TOKEN request
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        yield res.status(501).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
exports.usersController = {
    getAllUsers,
    registrUser,
    loginUser,
    updateOneUser,
    deleteOneUser
};
