import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "product";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: Number,
  stock: Number,
  category: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);
export default productModel;
