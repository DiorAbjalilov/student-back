import { Request, Response } from 'express';
import UserModule from '../models/user';
import Jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Config } from '../config/config';

// post registration new user || POST request || TOKEN response
const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, phone } = req.body;
    if (firstName && lastName && password && phone) {
      const isUser = await UserModule.findOne({ phone });

      if (!!isUser) {
        return res.status(400).json({
          success: false,
          data: [],
          message: "Bu telfon raqam ro'yxatdan o'tgan"
        });
      }
      const newUser = await new UserModule({
        firstName,
        lastName,
        password,
        phone
      });
      newUser.save();
      await res.status(201).json({
        success: true,
        data: newUser,
        message: "Ro'yxatdan o'tdingiz"
      });
    } else {
      res.status(400).json({
        success: false,
        data: [],
        message: "Kechirasiz ma'lumotlar to'liq emas"
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
    const { password, phone } = req.body;
    if (password && phone) {
      const isUser = await UserModule.findOne({ phone }).select(['+password']);

      if (!isUser) {
        return res.status(400).json({
          success: false,
          data: [],
          message: "Bu telfon raqam ro'yxatdan o'tmagan"
        });
      }
      const isPasswordCorrect = await bcrypt.compareSync(
        JSON.stringify(password),
        isUser.password
      );

      if (!!isPasswordCorrect) {
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
        message: 'Kechirasiz Telfon raqam yoki parol xato'
      });
    }
    await res.status(404).json({
      success: false,
      data: [],
      message: "Kechirasiz ma'lumotlar to'liq emas"
    });
  } catch (error) {
    console.log(error);
    await res.status(501).json({ success: false, data: [], message: error });
  }
};

// update user || PUT request || By ID || TOKEN request
const updateOneUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, birthDay, sex, address } = req.body;
    // @ts-ignore
    const photoPath = req.file?.path ?? '';
    console.log(photoPath);

    // @ts-ignore
    const _id = req.auth.subject;
    const isUser = await UserModule.findById({ _id });
    if (!!isUser) {
      isUser.firstName = firstName ?? isUser.firstName;
      isUser.lastName = lastName ?? isUser.lastName;
      // isUser.phone = phone ?? isUser.phone;
      isUser.avatar = photoPath ?? isUser.avatar;
      isUser.birthDay = birthDay ?? isUser.birthDay;
      isUser.sex = sex ?? isUser.sex;
      isUser.address = address ?? isUser.address;
      await isUser.save();
      await res.status(200).json({
        success: true,
        data: isUser,
        message: "Ma'lumotlar o'zgartirildi"
      });
    }
    await res.status(404).json({
      success: false,
      data: [],
      message: ''
    });
  } catch (error) {
    await res.status(400).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// delete user || DELETE request || By ID || TOKEN request
const deleteOneUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    await res.status(404).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

// get all users || GET request || Admin request || TOKEN request
const getAllUsers = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    await res.status(501).json({ success: false, data: [], message: error });
    console.log(error);
  }
};

export const usersController = {
  getAllUsers,
  registerUser,
  loginUser,
  updateOneUser,
  deleteOneUser
};
