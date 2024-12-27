import { useContext, useEffect, useState } from "react"
import { ListOrdersComponent } from "./listOrders.component"
import { OrdersContext } from "../../core/context/ordersContext"
import { OrderDetail } from "../../core/interfaces/Order";

export const ListOrdersContainer = () => {

    const context = useContext(OrdersContext);
    const {
        orders,
        category
    } = context;

    const [orderList, setOrderList] = useState<OrderDetail[]>([]);

    useEffect(() => {
        const filtered = orders.filter((order) => {
            if (category == 'all') return true;
            if (category == 'active') return order.sent === false;
            if (category == 'sent') return order.sent === true;

            return false;
        })
        setOrderList(Object.values(filtered));
        console.log(filtered);
    }, [orders, category])

    return (
        <ListOrdersComponent orders={orderList} />
    )
}