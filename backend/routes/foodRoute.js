import express from 'express'
import { addFood ,listFood,editFood, removeFood} from '../controllers/foodController.js'
import multer from 'multer'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

const foodRouter = express.Router();

//Image Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-del",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.post("/edit", upload.single("image"), editFood) 
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;