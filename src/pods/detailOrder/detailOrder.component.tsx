import { OrdersContext } from "../../core/context/ordersContext";
import { useContext, useReducer } from "react";
import { Header } from "./components/header.component";
import { ListOrder } from "./components/listOrder.component";
import { actionTypes, orderFormReducer } from "./components/orderFormReducer";
import './detailOrder.css'
import { BackButton } from "../../common/backButton";
import { Errors } from "./components/errors.component";

export const DetailOrderComponent = () => {
    const context = useContext(OrdersContext);
    const { orderSelected } = context;

    const initialState = {
        numberEntity: {
            value: orderSelected.numberEntity
        },
        provider: {
            value: orderSelected.provider,
            isValid: true,
            isTouched: false,
        },
        date: {
            value: orderSelected.date,
            isValid: true,
            isTouched: false,
        },
        totalAmount: {
            value: orderSelected.totalAmount,
        },
        orderState: {
            value: orderSelected.orderState,
            isValid: false,
        },
        sent: false,
        orderEntries: {
            orderEntries: orderSelected.orderEntries.map((entry, index) => ({
                ...entry,
                description: {
                    value: entry.description,
                    isTouched: false,
                    isValid: true
                },
                amount: {
                    value: entry.amount,
                    isTouched: false,
                    isValid: true
                }

            }))
        },
    };

    const [formState, dispatch] = useReducer(orderFormReducer, initialState);

    const handleProviderChange = (value) => {
        dispatch({
            type: actionTypes.UPDATE_PROVIDER, payload: value
        })
    }

    const handleDateChange = (value) => {
        dispatch({
            type: actionTypes.UPDATE_DATE, payload: value
        })
    }

    const handleTotalAmountChange = (value) => {
        dispatch({
            type: actionTypes.UPDATE_TOTALAMOUNT, payload: value
        })
    }

    const handleAddEntry = (value) => {
        dispatch({
            type: actionTypes.ADD_ENTRY, payload: value
        })
    }

    const handleUpdateEntryField = (value) => {
        dispatch({
            type: actionTypes.UPDATE_ENTRY_FIELD, payload: value
        })
    }

    const handleDeleteEntry = (value) => {
        dispatch({
            type: actionTypes.DELETE_ENTRY, payload: value
        })
    }

    const handleUpdateEntriesState = (value) => {
        dispatch({
            type: actionTypes.UPDATE_ENTRY_STATE, payload: value
        })
    }

    const handleUpdateOrderState = () => {
        dispatch({
            type: actionTypes.UPDATE_ORDERSTATE
        })
    }

    const handleOrderSent = () => {
        dispatch({
            type: actionTypes.UPDATE_ORDER_SENT
        })
    }

    return (
        <div className="detail-detailOrderPage">
            <BackButton />
            <h2 className="title">
                Pedido a proveedor
            </h2>

            <form>
                <Header
                    handleProviderChange={handleProviderChange}
                    handleDateChange={handleDateChange}
                    handleOrderSent={handleOrderSent}
                    formState={formState}
                />
                <ListOrder
                    handleAddEntry={handleAddEntry}
                    handleUpdateEntryField={handleUpdateEntryField}
                    handleTotalAmountChange={handleTotalAmountChange}
                    handleDeleteEntry={handleDeleteEntry}
                    handleUpdateEntriesState={handleUpdateEntriesState}
                    handleUpdateOrderState={handleUpdateOrderState}
                    formState={formState}
                />
            </form>
            <Errors formState={formState} />
        </div>

    )
}