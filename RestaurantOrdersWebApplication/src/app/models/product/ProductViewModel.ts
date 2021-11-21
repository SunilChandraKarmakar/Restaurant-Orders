import { OrderViewModel } from "../order/OrderViewModel";

export class ProductViewModel {
    id: number;
    name: string;
    price: number;

    orders: OrderViewModel[];
}
