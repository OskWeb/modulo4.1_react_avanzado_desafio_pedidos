import { AppLayout } from "../layout/app.layout";
import { DetailOrderContainer } from "../pods/detailOrder/detailOrder.container";

export const DetailOrderPage: React.FC = () => {
    return (
        <AppLayout>
            <DetailOrderContainer />
        </AppLayout>
    )
}