import { Category } from "./Category";
import { User } from "./User";

export type Product = {
  id: number;
  productName: string;
  productDescription: string;
  productImage: string;
  brand: string;
  price: number;
  seller: User;
  category: Category;
  quantity: number;
};
