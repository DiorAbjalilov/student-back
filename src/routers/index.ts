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

// user routers
router.post('/register', controller.usersController.registerUser);
router.post('/login', controller.usersController.loginUser);
router.put(
  '/updateUser',
  verifyToken,
  upload.single('avatar'),
  controller.usersController.updateOneUser
);
router.post(
  '/deleteUser',
  verifyToken,
  controller.usersController.deleteOneUser
);

// poster routers
router.get('/posters', controller.postersController.getAllPosters);
router.get('/poster', controller.postersController.getOnePoster);
router.post(
  '/poster/new',
  verifyToken,
  controller.postersController.addNewPoster
);
router.put(
  '/poster/update',
  verifyToken,
  controller.postersController.updateOnePoster
);
router.delete(
  '/poster/delete',
  verifyToken,
  controller.postersController.deleteOnePoster
);
router.get('/posters/search', controller.postersController.getSearchPosters);

export const routers = router;
