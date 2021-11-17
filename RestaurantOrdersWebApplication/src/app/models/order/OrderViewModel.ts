import { CustomerViewModel } from "../customer/CustomerViewModel";
import { OrderDetailsViewModel } from "../orderdetails/OrderDetailsViewModel";
import { PaymentGetwayViewModel } from "../paymentgetway/PaymentGetwayViewModel";

export class OrderViewModel {
    id: number;
    orderNumber: string;
    customerId: number;
    paymentGetwayId: number;
    totalPrice: number;

    customer: CustomerViewModel;
    paymentGetway: PaymentGetwayViewModel;
    //orderDetails: OrderDetailsViewModel[];
}
