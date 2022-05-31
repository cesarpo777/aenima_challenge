const { Router } = require('express');
const { check, body } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { existProductById } = require('../helpers/db-validators')
const { getProduct,
getProducts,
createProduct,
editProduct,
deleteProduct,
test
} = require('../controllers/products')


const router = Router();


// Obtains all products
router.get('/', getProducts)

// Obtains product by id
router.get('/:id',[
    check('id', 'id must be valid').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
] , getProduct)

// Create a product
router.post('/',[
    check('name', 'Name field must be between 8 and 50 chars').isLength({ min:8, max: 50}),
    check('price', 'price must be a valid number').isFloat(),
    check('description', 'Description field is required').not().isEmpty(),
    validateFields
], createProduct )


router.post('/test', test )

//Edit product

router.put('/:id',[
    check('id', 'id must be valid').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
], editProduct )

// Delete product by id
router.delete('/:id',[
    check('id', 'id must be valid').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
] ,deleteProduct )


module.exports = router;