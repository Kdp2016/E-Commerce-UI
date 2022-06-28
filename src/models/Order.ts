import { User } from "./User";

export type Order = {
    id: number;
    buyer: User;
    address: string;
    status: string;
    total: number;
};