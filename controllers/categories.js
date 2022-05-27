const Category = require('../models/Category');


const createCategory = async( req, res ) =>{

  const { name } = req.body;

  try{

    const category = await Category.create( { name } )
    if( category ){
        res.status(201).json({
            msg: 'Category has been created succesfully',
            category
        })
    }

  }catch(error){
    console.log( error )
    res.status(500).json({
        msg: 'Something went wrong call the admin'
    })
  }

}

const getCategories = async( req, res ) =>{

    try {
        const categories = await Category.find();

        res.status(200).json({
            categories
        })
    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin :('
        })
    }

}

module.exports = {
    createCategory,
    getCategories
}

