import { Request, Response } from 'express';
import UserModule from '../models/user';
import Jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Config } from '../config/config';

// google auth configuration settings
// const googleAuthCallBack = () =>
//   passport.authenticate('google', {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: 'error'
//   });

// const googleAuth = () => passport.authenticate('google', ['profile', 'email']);

// post registration new user || POST request || TOKEN response
const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, gmail } = req.body;
    const photoPath = req.file?.path ?? 'upload/default-avatar.png';

    if (firstName && lastName && password && gmail) {
      const isUser = await UserModule.findOne({ gmail });

      if (isUser) {
        return res.status(400).json({
          success: false,
          data: [],
          message: 'This gmail is already registered'
        });
      }
      const newUser = await new UserModule({
        firstName,
        lastName,
        password,
        gmail,
        avatar: photoPath
      });
      newUser.save();
      await res.status(201).json({
        success: true,
        data: newUser,
        message: 'You have successfully registered'
      });
    } else {
      res.status(400).json({
        success: false,
        data: [],
        message: 'Sorry, you are not allowed to register'
      });
    }
  } catch (error) {
    console.log(error);
    await res.status(501).json({ success: false, data: [], message: error });
  }
};

// post login user || POST request || TOKEN response
const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, gmail } = req.body;

    if (password && gmail) {
      const isUser = await UserModule.findOne({ gmail }).select(['+password']);

      if (!isUser?._id) {
        return res.status(400).json({
          success: false,
          data: [],
          message: 'This gmail account is not available'
        });
      }

      const isPasswordCorrect = await bcrypt
        .compare(password, isUser.password)
        .then(function (result) {
          return result;
        });

      if (isPasswordCorrect) {
        const payload = { subject: isUser._id };
        const token = Jwt.sign(payload, Config.JWT_SECRET);
        return res.status(200).json({
          success: true,
          data: { user: isUser, token },
          message: ''
        });
      }
      await res.status(404).json({
        success: false,
        data: [],
        message: 'Sorry, the gmail or password is incorrect'
      });
    }
    await res.status(404).json({
      success: false,
      data: [],
      message: 'Sorry, the information is incomplete'
    });
  } catch (error) {
    console.log(error);
    await res.status(501).json({ success: false, data: [], message: error });
  }
};

// update user || PUT request || By ID || TOKEN request
// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { firstName, lastName, birthDay, sex, address } = req.body;
//     const photoPath = req.file?.path ?? '';
//     console.log(photoPath);

//     const _id = req.auth.subject;
//     const isUser = await UserModule.findById({ _id });
//     if (isUser) {
//       isUser.firstName = firstName ?? isUser.firstName;
//       isUser.lastName = lastName ?? isUser.lastName;
//       // isUser.phone = phone ?? isUser.phone;
//       isUser.avatar = photoPath ?? isUser.avatar;
//       isUser.birthDay = birthDay ?? isUser.birthDay;
//       isUser.sex = sex ?? isUser.sex;
//       isUser.address = address ?? isUser.address;
//       await isUser.save();
//       await res.status(200).json({
//         success: true,
//         data: isUser,
//         message: 'The information has been changed'
//       });
//     }
//     await res.status(404).json({
//       success: false,
//       data: [],
//       message: ''
//     });
//   } catch (error) {
//     await res.status(400).json({ success: false, data: [], message: error });
//     console.log(error);
//   }
// };

// delete user || DELETE request || By ID || TOKEN request
// const deleteOneUser = async (req: Request, res: Response) => {
//   try {
//     const _id = req.auth.subject;
//     const isUser = await UserModule.findByIdAndRemove({ _id });
//     if (isUser) {
//       await res
//         .status(404)
//         .json({ success: true, data: [], message: 'Account deleted' });
//     }
//     await res
//       .status(404)
//       .json({ success: false, data: [], message: 'Account is not found' });
//   } catch (error) {
//     await res.status(404).json({ success: false, data: [], message: error });
//     console.log(error);
//   }
// };

// get all users || GET request || Admin request || TOKEN request
const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log('ss');
  } catch (error) {
    await res.status(501).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

export const usersController = {
  getAllUsers,
  registerUser,
  loginUser
  // updateUser,
  // deleteOneUser
  // googleAuth,
  // googleAuthCallBack
};
