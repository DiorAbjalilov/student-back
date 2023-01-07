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
exports.videos = void 0;
const videos_1 = __importDefault(require("../models/videos"));
// get all videos
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield videos_1.default.find({ userId: id });
        yield res.status(200).json({ success: true, data: result, error: false });
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], error: error });
        console.log(error);
    }
});
// add new video
const addVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, videos, type, view, userId } = req.body;
        const result = new videos_1.default({
            title,
            description,
            type,
            videos,
            view,
            userId
        });
        yield result.save().then(() => {
            res.status(201).json({ seccuss: true, data: result, error: false });
        });
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], error: error });
        console.log(error);
    }
});
// update old video
const putVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const isVideo = yield videos_1.default.findById({ _id: id });
        if (!!isVideo) {
            Object.assign(isVideo, req.body);
            yield isVideo
                .save()
                .then(() => {
                res
                    .status(200)
                    .json({ success: true, data: isVideo, message: 'video updated' });
            })
                .catch((error) => {
                res.status(400).json({ success: false, data: [], message: error });
            });
        }
        yield res
            .status(404)
            .json({ success: false, data: [], message: 'video not found' });
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// delete one video
const deleteVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const isVideo = yield videos_1.default.findByIdAndDelete({ _id: id });
        if (!!isVideo) {
            yield res
                .status(200)
                .json({ success: true, data: [], message: 'video deleted' });
        }
        else {
            yield res
                .status(401)
                .json({ success: false, data: [], message: 'video not found' });
        }
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
exports.videos = {
    getVideos,
    addVideos,
    putVideos,
    deleteVideos
};
