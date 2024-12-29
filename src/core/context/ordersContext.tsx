import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { OrderDetail } from "../interfaces/Order";

interface ProviderProps {
    children: ReactNode
}

interface OrdersContextEntity {
    orders: OrderDetail[];
    setOrders: Dispatch<SetStateAction<OrderDetail[]>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    orderSelected: OrderDetail;
    setOrderSelected: Dispatch<SetStateAction<OrderDetail>>;
}

const initialContext: OrdersContextEntity = {
    orders: [],
    setOrders: () => { },
    category: '',
    setCategory: () => { },
    orderSelected: {
        numberEntity: '',
        provider: '',
        date: '',
        totalAmount: 0,
        orderState: '',
        sent: false,
        orderEntries: []
    },
    setOrderSelected: () => { }

}

export const OrdersContext = createContext<OrdersContextEntity>(initialContext);

export const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {

    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const [category, setCategory] = useState<string>('');
    const [orderSelected, setOrderSelected] = useState<OrderDetail>(
        {
            numberEntity: '',
            provider: '',
            date: '02-05-2024',
            totalAmount: 0,
            sent: false,
            orderState: '',
            orderEntries: [{
                idEntry: '',
                itemState: false,
                description: '',
                amount: 0,
            }]
        },
    );

    return (
        <OrdersContext.Provider value={{
            orders,
            setOrders,
            category,
            setCategory,
            orderSelected,
            setOrderSelected
        }}>
            {children}
        </OrdersContext.Provider>
    )
}