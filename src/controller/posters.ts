import { Request, Response } from 'express';
import PosterModule from '../models/poster';

// get all posters || GET request || NO TOKEN request
const getAllPosters = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// add new poster || POST request || TOKEN request
const addNewPoster = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// update poster || PUT request || By ID || TOKEN request
const updateOnePoster = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// delete poster || DELETE request || By ID || TOKEN request
const deleteOnePoster = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

export const postersController = {
  getAllPosters,
  addNewPoster,
  updateOnePoster,
  deleteOnePoster
};
