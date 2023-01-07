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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postersController = void 0;
// get all posters || GET request || NO TOKEN request
const getAllPosters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// add new poster || POST request || TOKEN request
const addNewPoster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// update poster || PUT request || By ID || TOKEN request
const updateOnePoster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
// delete poster || DELETE request || By ID || TOKEN request
const deleteOnePoster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        yield res.status(404).json({ success: false, data: [], message: error });
        console.log(error);
    }
});
exports.postersController = {
    getAllPosters,
    addNewPoster,
    updateOnePoster,
    deleteOnePoster
};
