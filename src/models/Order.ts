import { User } from "./User";

export type Order = {
    id: number;
    buyer: User;
    orderItems: OrderItems[];
    address: string;
    status: string;
    total: number;
    customer_id: number;
};

export type OrderItems = {
    productId: number;
    quantity: number;
}