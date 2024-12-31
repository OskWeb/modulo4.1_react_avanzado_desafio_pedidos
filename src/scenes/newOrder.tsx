import { AppLayout } from "../layout/app.layout";
import { CreateOrderContainer } from "../pods/createOrder";

export const CreateOrderPage: React.FC = () => {
    return (
        <AppLayout>
            <CreateOrderContainer />
        </AppLayout>
    )
}