const Product = require('../models/Product')


const existProductById = async( id ) => {
    const existProduct = await Product.findById( id )

    if(!existProduct){
        throw new Error(`There is no product with id: ${id}`)
    }

}


module.exports = {
    existProductById
}

