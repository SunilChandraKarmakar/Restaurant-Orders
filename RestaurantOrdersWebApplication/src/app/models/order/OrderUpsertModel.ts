import { OrderDetailsViewModel } from "../orderdetails/OrderDetailsViewModel";

export class OrderUpsertModel {
    id: number;
    orderNumber: string;
    customerId: number;
    paymentGetwayId: number;
    totalPrice: number;
    orderDetails: OrderDetailsViewModel[] = [];
}
