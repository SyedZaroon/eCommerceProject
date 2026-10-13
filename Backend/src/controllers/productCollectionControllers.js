import productCollection from "../models/productCollectionModel.js"; 

export const createProductCollection = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: "Collection name is required." 
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const existingCollection = await productCollection.findOne({ 
      $or: [{ name }, { slug }] 
    });

    if (existingCollection) {
      return res.status(400).json({ 
        success: false, 
        message: "Product collection with this name already exists." 
      });
    }

    const newCollection = await productCollection.create({
      name,
      slug,
    });

    return res.status(201).json({
      success: true,
      message: "Product collection created successfully.",
      data: newCollection,
    });

  } catch (error) {
    console.error("Error creating product collection:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error.", 
      error: error.message 
    });
  }
};

export const deleteProductCollection = async(req,res)=>{
    try{

        const deleteCollection = await productCollection.findByIdAndDelete(req.params.id);
        
        if(!deleteCollection){
            return res.status(404).json({success:false, message:"collection not found"})
        }
        return res.status(200).json({message:"collection deleted"})
    }
    catch{
        return res.status(500).json({message:error.message})
    }
}

export const getAllProductCollection = async(req,res)=>{
    try{
        const productCollection = await productCollection.find();
        res.status(200).json(productCollection);
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}