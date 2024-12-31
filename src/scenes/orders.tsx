import { AppLayout } from "../layout/app.layout";
import { ListOrdersContainer } from "../pods/listOrders";

export const OrdersPage: React.FC = () => {
    return (
        <AppLayout>
            <ListOrdersContainer />
        </AppLayout>
    )
}