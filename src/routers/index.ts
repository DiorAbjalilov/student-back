import express, { Request } from 'express';
const router = express.Router();
import controller from '../controller';
import { verifyToken } from '../middleware/auth';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, './upload');
  },
  filename: function async(req: Request, file, cb) {
    let type = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}-photo.${type}`);
  }
});

const upload = multer({ storage: storage });

router.post('/register', controller.usersController.registerUser);
router.post('/login', controller.usersController.loginUser);
router.put(
  '/updateUser',
  verifyToken,
  upload.single('avatar'),
  controller.usersController.updateOneUser
);

export const routers = router;
