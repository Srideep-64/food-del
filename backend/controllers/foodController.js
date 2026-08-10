import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinary.js";

// add food item
const addFood = async (req, res) => {
    let image_url = req.file.path; // Cloudinary URL

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_url
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// edit food item
const editFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Update fields
        food.name = req.body.name || food.name;
        food.description = req.body.description || food.description;
        food.price = req.body.price || food.price;
        food.category = req.body.category || food.category;

        // If new image uploaded
        if (req.file) {
            // Delete old image from Cloudinary
            const oldPublicId = food.image.split('/').slice(-2).join('/').split('.')[0];
            cloudinary.uploader.destroy(oldPublicId, (err, result) => {
                if (err) console.log("Error deleting old Cloudinary image:", err);
            });

            // Save new image URL
            food.image = req.file.path;
        }

        await food.save();

        res.json({ success: true, message: "Food Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food" });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        const publicId = food.image.split('/').slice(-2).join('/').split('.')[0];
        cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) console.log("Error deleting Cloudinary image:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, editFood, listFood, removeFood }