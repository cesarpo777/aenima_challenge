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
      default: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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