const { Schema, model } = require('mongoose');
const Category = require('./Category');

const ProductSchema = Schema({
  
    name:{
      type: String,
      required: true,
      trim: true
    },

    description:{
      type: String,
      required: true,
      trim: true
    },
    
    price:{
      type: Number,
      required: true
    },

    img:{
      type: String,
      default: 'some url'
    },

    state:{
      type: Boolean,
      default: true
    },

    category:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    }
});

ProductSchema.methods.toJSON = function(){
  const { __v, _id, ...product } = this.toObject();
  product.uid = _id
  return product;
}

module.exports = model( 'Product', ProductSchema )