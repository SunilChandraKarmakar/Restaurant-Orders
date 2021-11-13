import { OrderDetailsUpsertModel } from "../orderdetails/OrderDetailsUpsertModel";

export class OrderUpsertModel {
    id: number;
    orderNumber: string;
    customerId: number;
    paymentGetwayId: number;
    totalPrice: number;
    orderDetails: OrderDetailsUpsertModel[] = [];
}
