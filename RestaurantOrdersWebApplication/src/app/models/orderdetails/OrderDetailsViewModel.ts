import { OrderViewModel } from "../order/OrderViewModel";
import { ProductViewModel } from "../product/ProductViewModel";

export class OrderDetailsViewModel {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;

    order: OrderViewModel;
    product: ProductViewModel;
}
