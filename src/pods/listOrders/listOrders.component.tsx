import { OrderDetail } from "../../core/interfaces/Order"
import "./listOrders.css"

import { OrderListNavigation } from "./components/orderListNavigation"

interface data {
    orders: OrderDetail[],
    //setOrders: () => void
}

export const ListOrdersComponent = ({ orders }: data) => {

    return (
        <div className="listOrders">
            <h1>Tus pedidos</h1>
            <div className="listOrdersNavigationBox">
                <OrderListNavigation orders={orders} />
            </div>
        </div>
    )
}