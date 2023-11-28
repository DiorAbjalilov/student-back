import { Request, Response } from 'express';
import PosterModule from '../models/poster';
import UserModule from '../models/user';

// get all posters || GET request || NO TOKEN request
const getAllPosters = async (req: Request, res: Response) => {
  try {
    const posters = await PosterModule.find();
    res.status(200).json({
      success: true,
      data: posters,
      message: 'Successfully fetched all posters'
    });
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// get all posters || GET request || NO TOKEN request
const getSearchPosters = async (req: Request, res: Response) => {
  try {
    console.log('GET POST request ');
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// get one poster || GET request || NO TOKEN request
const getOnePoster = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const poster = await PosterModule.findById({ _id: id });
    if (poster?._id) {
      res.status(200).json({
        success: true,
        data: poster,
        message: 'Successfully fetched one poster'
      });
    } else {
      res.status(401).json({
        success: false,
        data: [],
        message: 'Failed to fetch one poster'
      });
    }
  } catch (error) {
    await res.status(501).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// add new poster || POST request || TOKEN request
const addNewPoster = async (req: Request, res: Response) => {
  try {
    const { title, text, photo, type } = req.body;
    //  @ts-ignore
    const id = req.auth.subject;

    if (title && text && type) {
      const isUser = await UserModule.findOne({ _id: id });
      const owner = {
        _id: id,
        avatar: isUser?.avatar,
        firstName: isUser?.firstName,
        lastName: isUser?.lastName
      };
      const newPoster = await new PosterModule({
        title,
        text,
        photo,
        likes: 0,
        type,
        owner: owner,
        comments: 0
      });
      newPoster.save();
      await res.status(201).json({
        success: true,
        data: newPoster,
        message: 'Successfully added new poster'
      });
    } else {
      await res.status(204).json({
        success: false,
        data: [],
        message: 'Failed to add new poster'
      });
    }
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// update poster || PUT request || By ID || TOKEN request
const updateOnePoster = async (req: Request, res: Response) => {
  try {
    console.log('Updating');
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// delete poster || DELETE request || By ID || TOKEN request
const deleteOnePoster = async (req: Request, res: Response) => {
  try {
    console.log('Deleting');
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

export const postersController = {
  getAllPosters,
  getSearchPosters,
  addNewPoster,
  updateOnePoster,
  deleteOnePoster,
  getOnePoster
};
