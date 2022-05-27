const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  
    name:{
      type: String,
      required: true,
      trim: true,
      uppercase: true
    }
});

CategorySchema.methods.toJSON = function(){
  const { __v, _id, ...category } = this.toObject();
  category.uid = _id
  return category;
}

module.exports = model( 'Category', CategorySchema )