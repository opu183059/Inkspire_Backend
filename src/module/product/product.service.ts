import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductWithQuery = async (query: any): Promise<IProduct[]> => {
  const { search, sortBy, sortOrder, inStock, category } = query;
  const conditions: any = {};
  const sort: any = {};

  if (search) {
    conditions.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    conditions.category = category;
  }
  if (inStock !== undefined) {
    conditions.inStock = inStock === "true";
  }
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const result = await Product.find(conditions).sort(sort);
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProduct = async (id: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProductWithQuery,
};
