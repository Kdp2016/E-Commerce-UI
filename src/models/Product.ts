import { User } from "./User";

export type Product = {
  id: number;
  productName: string;
  productDescription: string;
  productImage: string;
  brand: string;
  price: number;
  seller: User;
  category: string;
  quantity: number;
  active: boolean;
};
