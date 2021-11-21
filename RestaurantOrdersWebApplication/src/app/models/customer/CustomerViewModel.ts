import { OrderViewModel } from "../order/OrderViewModel";

export class CustomerViewModel {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;

    orders: OrderViewModel[];
}
