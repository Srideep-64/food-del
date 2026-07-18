import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item
const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename} `;

    const food= new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
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
            // Delete old image
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });

            // Save new image
            food.image = req.file.filename;
        }

        await food.save();

        res.json({ success: true, message: "Food Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food" });
    }
};

// all food list
const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("Error deleting file:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
    
export {addFood,editFood,listFood,removeFood}