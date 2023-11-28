import { Request, Response } from 'express';
import PosterModule from '../models/poster';
import CommentModule from '../models/comment';
import UserModule from '../models/user';

// get all comments || GET request || NO TOKEN request
const getAllCommentByIdPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const comments = await CommentModule.find({ post_id: id });
    if (comments.length) {
      res.status(200).json({
        success: true,
        data: comments,
        message: 'Successfully fetched all comments'
      });
    } else {
      res.status(401).json({
        success: false,
        data: [],
        message: 'no comments found for post'
      });
    }
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// add new comment || POST request || TOKEN request
const addNewComment = async (req: Request, res: Response) => {
  try {
    const { text, post_id } = req.body;
    //  @ts-ignore
    const id = req.auth.subject;

    if (text && post_id) {
      const isUser = await UserModule.findOne({ _id: id });
      const isPost = await PosterModule.findOne({ _id: post_id });
      const owner = {
        _id: id,
        avatar: isUser?.avatar,
        firstName: isUser?.firstName,
        lastName: isUser?.lastName
      };
      const newComment = await new CommentModule({
        text,
        post_id,
        like: 0,
        owner: owner
      });
      await newComment.save();
      // @ts-ignore
      isPost?.comments = isPost?.comments + 1;
      await isPost?.save();

      await res.status(201).json({
        success: true,
        data: newComment,
        message: 'Successfully added new comment'
      });
    } else {
      await res.status(204).json({
        success: false,
        data: [],
        message: 'Failed to add new comment'
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

export const commentsController = {
  getAllCommentByIdPost,
  addNewComment
};
