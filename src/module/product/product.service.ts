import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = (await Product.create(payload)).populate("author", {
    name: 1,
    email: 1,
  });
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

  const result = await Product.find(conditions).sort(sort).populate("author", {
    name: 1,
    email: 1,
    _id: 0,
  });
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProduct = async (
  productId: string,
  userID: string,
  payload: Partial<IProduct>
) => {
  const findProductById = await Product.findById(productId);

  if (!findProductById) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  } else if (
    findProductById.author &&
    findProductById.author.toString() !== userID
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this Product"
    );
  }

  const result = await Product.findOneAndUpdate(
    { _id: productId, author: userID },
    payload,
    {
      new: true,
    }
  ).populate("author", {
    name: 1,
    email: 1,
  });
  return result;
};

const deleteProduct = async (productId: string, userID: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "product not found");
  } else if (product.author && product.author.toString() !== userID) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to delete this product"
    );
  }
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const productService = {
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProductWithQuery,
};
