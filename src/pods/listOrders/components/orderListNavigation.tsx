import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext } from 'react';
import { OrderDetail } from '../../../core/interfaces/Order';
import { ListOrderTable } from './listOrderTable.component';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { OrdersContext } from '../../../core/context/ordersContext';

interface Data {
    orders: OrderDetail[],
}

export const OrderListNavigation = ({ orders }: Data) => {

    const navigate = useNavigate();
    const context = useContext(OrdersContext);
    const {
        category,
        setCategory
    } = context;

    return (
        <div>
            <div className='navigation-createButton-box'>
                <div className='orderListNavigation'>
                    <button onClick={() => {
                        setCategory("all")
                    }}
                        className={category == 'all' ? 'navigationActive' : 'navigationDefault'}
                    >Todos<FormatListBulletedIcon />
                    </button>
                    <button onClick={() => setCategory("active")}
                        className={category == 'active' ? 'navigationActive' : 'navigationDefault'}>Activos <MoreHorizIcon /></button>
                    <button onClick={() => setCategory("sent")}
                        className={category == 'sent' ? 'navigationActive' : 'navigationDefault'}
                    >Enviados <LocalShippingIcon /></button>
                </div>
                <button
                    onClick={() => navigate('/orders/new_order')}
                    className="newOrderButton">
                    <span>
                        <AddIcon />
                        Crear pedido
                    </span>

                </button>
            </div>
            <div className='orderListContent'>
                <ListOrderTable orders={orders} />
            </div>
        </div>
    )
}