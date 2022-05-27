const { Router } = require('express');
const { check, body } = require('express-validator');
const {
    createCategory,
    getCategories
} = require('../controllers/categories')


const router = Router();


router.post('/', createCategory)

router.get('/', getCategories )


module.exports = router;

