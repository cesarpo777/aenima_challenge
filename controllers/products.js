const Product = require('../models/Product')

const getProducts =  async( req, res ) =>{

  //const { limit = 10, from = 0 } = req.query;  
  let query = {}
  
  if( req.query.name !== undefined && req.query.name.length > 0){
      query['name'] = req.query.name;
  }

  if( req.query.category !== undefined && req.query.category.length > 0){
      query['category'] = req.query.category;
  }

  if( req.query.price !== undefined && req.query.price.length > 0){
      query['price'] = req.query.price;
  }

  try {

    const products = await Product.find( query )
       /*  .skip(Number(from))
        .limit(Number(limit))
 */
     res.status(200).json({
        total: products.length,
        products
    })

  } catch (error) {
      console.log( error )
      res.status(500).json({
          msg: 'Something went wrong call the admin'
      })
  } 
}

const getProduct =  async( req, res ) =>{

    const { id } = req.params;
   
    try {
        const product = await Product.findById( id )
        if( product ){
            res.status(200).json({
                product
            })
        }
    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }

}

const createProduct = async( req, res ) =>{

    try {
        const product = await Product.create( req.body )
        if(product)
        res.status(201).json({
            msg:'Product has been created succesfully',
            product
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }
}

const editProduct =  async( req, res ) =>{

    const { id } = req.params;
    const { name, category, price, img, description} = req.body;
    let updates = {
        name,
        category,
        price,
        img,
        description
    }
  
    try {
        const modifiedProduct = await Product.findByIdAndUpdate(id, updates , { new: true })
        res.status(200).json({
            modifiedProduct
        })


    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }

}

const deleteProduct =  async( req, res ) =>{

    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndUpdate( id, { state: false }, { new: true , fields:{ name:1, state: 1 }} )
        const products = await Product.find({state: true});
        
        res.status(200).json({
            msg: 'Product has been removed',
            deletedProduct,
            products
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }

}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}