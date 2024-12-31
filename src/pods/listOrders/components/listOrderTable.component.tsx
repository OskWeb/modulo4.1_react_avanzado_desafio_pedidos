import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { OrderDetail } from "../../../core/interfaces/Order"
import { Empty } from "./empty.component"
import { OrdersContext } from "../../../core/context/ordersContext"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getDateShow } from "../../../core/utils/formatters.util"

export const ListOrderTable = ({ orders }) => {

    const navigate = useNavigate();
    const context = useContext(OrdersContext);
    const { setOrders, setOrderSelected } = context;

    const deleteOrder = (orderId) => {
        const ordersUpdated = orders.filter((order: OrderDetail) => order.numberEntity !== orderId);
        setOrders(ordersUpdated);
    }

    return (
        <div className="listOrdersTable">
            {
                orders.length > 0 ? (
                    <TableContainer component={Paper}
                        sx={{
                            maxHeight: '75vh'
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Número</TableCell>
                                    <TableCell align="right">Proveedor</TableCell>
                                    <TableCell align="right">Fecha</TableCell>
                                    <TableCell align="right">Opciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders.map((order: OrderDetail) => (
                                        <TableRow
                                            key={order.numberEntity}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                borderBottom: '1px solid gray',
                                            }}
                                        >
                                            <TableCell component="th" scope="row" className="tableCellNumberEntity">
                                                <span>
                                                    {order.numberEntity}
                                                </span>
                                            </TableCell>
                                            <TableCell align="right">
                                                <span>
                                                    {order.provider}
                                                </span>
                                            </TableCell>
                                            <TableCell align="right">
                                                <span>
                                                    {getDateShow(order.date)}
                                                </span>
                                            </TableCell>
                                            <TableCell align="right" className="buttons-options-list-cell">
                                                <div className="buttons-options-list">
                                                    <button onClick={() => {
                                                        setOrderSelected(order);
                                                        navigate(`${order.numberEntity}`)
                                                    }}
                                                        className="openButton"
                                                    >
                                                        <span>Abrir</span>
                                                        <KeyboardArrowRightIcon />
                                                    </button>
                                                    <button onClick={() => {
                                                        deleteOrder(order.numberEntity);
                                                    }}
                                                        className="deleteButton"
                                                    >
                                                        <span>Eliminar</span>
                                                        <DeleteOutlineIcon />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Empty />
                )
            }

        </div>

    )
}