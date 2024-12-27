import { useNavigate } from "react-router-dom";
import { OrderDetail } from "../../../core/interfaces/Order";
import { OrdersContext } from "../../../core/context/ordersContext";
import { useContext } from "react";

interface data {
    order: OrderDetail
}
export const OrderCard = ({ order }: data) => {

    const navigate = useNavigate();
    const context = useContext(OrdersContext);
    const { setOrderSelected } = context;

    return (
        <button className="orderList"
            onClick={() => {
                setOrderSelected(order);
                navigate(`${order.numberEntity}`)
            }}>
            <span className="item1">{order.numberEntity}</span>
            <span className="item2">{order.provider}</span>
            <span className="item3">{order.date}</span>

        </button>
    )
}