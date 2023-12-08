
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  p_id: {
    type: String,
    required: true,
    unique: true,
  },
  p_name: {
    type: String,
    required: true,
  },
  p_category: {
    type: String,
    required: true,
  },
  p_image: {
    type: String,
  },
  p_description: {
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
