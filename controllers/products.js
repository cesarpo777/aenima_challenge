const Product = require('../models/Product')
const ObjectId = require('mongoose').Types.ObjectId

const getProducts = async (req, res) => {

    let productsXPage = 5;

    const { pag } = req.query;
    let query = { state: true }

    try {
        const from = (pag - 1) * productsXPage;
        const products = await Product.find(query).limit(productsXPage).skip(Number(from))

        res.status(200).json({
            total: products.length,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }
}

const getProduct = async (req, res) => {

    const { id } = req.params;

    try {
        const product = await Product.findOne({ id, state: true })

        res.status(200).json({
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }

}

const test = async (req, res) => {

    const { searchTerm, category, pag, rxp, price } = req.body;
    //const regex = new RegExp( searchTerm, 'i')

    let conditions = []// [{$match: [ ] }]
    let coincidencia = [{ state: true }]


    let from = (parseInt(pag) - 1) * rxp;
    //console.log( from, pag , rxp )
    if (category !== 'xx') {
        //conditions.push({ $match: { category: ObjectId(category) }})
        coincidencia.push({ category: ObjectId(category) })
    }

    //{ "$match" : { "invoice" : { "$regex": "000-0000-2490", "$options": "i" } } }
    if (searchTerm && searchTerm.trim().length > 0) {
        coincidencia.push({ name: { $regex: searchTerm, $options: "i" } })
    }

    switch (price) {
        case '$0 - $5.000':
            coincidencia.push({ price: { $lt: 5000 }})
            break;

    
        case '$5.000 - $50.000':
            coincidencia.push({ price: { $gt: 5000,  $lt: 50000 }})
            break;
        
        case '$50.000 - xxxxxx':
            coincidencia.push({ price: { $gt: 50000 }})
        default:
            break;
    }

    if (coincidencia.length > 0) {
        conditions.push({ $match:  { $and: coincidencia } })
    }

    if (pag !== undefined) {

        conditions.push({ $skip: from })
    }

    if (rxp !== undefined) {
        conditions.push({ $limit: parseInt(rxp) })
    }

    console.log(conditions)
    console.log( coincidencia)
    try {

        const products = await Product.aggregate(conditions)

        res.json({
            products
        })

    } catch (error) {
        console.log(error)
    }
}

const createProduct = async (req, res) => {

    try {
        const product = await Product.create(req.body)
        const products = await Product.find({ state: true })
        res.status(201).json({
            msg: 'Product has been created succesfully',
            product,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }
}

const editProduct = async (req, res) => {

    const { id } = req.params;
    const { name, category, price, img, description } = req.body;
    let updates = {
        name,
        category,
        price,
        img,
        description
    }

    try {
        const modifiedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })
        const products = await Product.find({ state: true })
        res.status(200).json({
            msg: 'Product has been modified',
            modifiedProduct,
            products
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }

}

const deleteProduct = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndUpdate(id, { state: false }, { new: true, fields: { name: 1, state: 1 } })
        const products = await Product.find({ state: true });

        res.status(200).json({
            msg: 'Product has been removed',
            deletedProduct,
            products
        })

    } catch (error) {
        console.log(error)
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
    deleteProduct,
    test
}