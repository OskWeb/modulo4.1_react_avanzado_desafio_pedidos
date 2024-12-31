import { OrderDetailReducer } from "../../../core/interfaces/Order"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useEffect, useRef, useState } from "react";
import { euro, percent } from "../../../core/utils/formatters.util";
import { OrdersContext } from "../../../core/context/ordersContext";
import { SlideTransition, TransitionsSnackbar } from "../../../common/transitionSnackbar";
import { TransitionProps } from "@mui/material/transitions/transition";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

interface data {
    formState: OrderDetailReducer;
    handleProviderChange: (value: string) => void
    handleDateChange: (value: string) => void
    handleOrderSent: () => void
}

export const Header = ({ formState, handleProviderChange, handleDateChange, handleOrderSent }: data) => {

    const [price, setPrice] = useState('');
    const [orderState, setOrderState] = useState('');

    const context = useContext(OrdersContext);
    const { orders, setOrders, setCategory, orderSelected } = context;

    const [snackbarUpdate, setSnackbarUpdate] = useState<snackbarType>({
        open: false,
    });
    const [snackbarSend, setSnackbarSend] = useState<snackbarType>({
        open: false,
    });

    const [formValid, setFormValid] = useState<boolean>(false);

    const handleStateChangeUpdate = (
        transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >
    ) => {
        setSnackbarUpdate({
            open: !snackbarUpdate.open,
            transition,
        });
    }

    const handleStateChangeSend = (
        transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>
            }
        >
    ) => {
        setSnackbarSend({
            open: !snackbarSend.open,
            transition,
        })
    }

    const handleSubmit = async () => {

        if (formState.provider.isValid &&
            formState.date.isValid &&
            !formState.orderEntries.orderEntries.find((entry) =>
                entry.description.isValid == false || entry.amount.isValid == false
            )
        ) {
            const ordersUpdated = orders.map((order) =>
                order.numberEntity === formState.numberEntity.value
                    ?
                    {
                        numberEntity: order.numberEntity,
                        provider: formState.provider.value,
                        date: formState.date.value,
                        totalAmount: formState.totalAmount.value,
                        orderState: formState.orderState.value,
                        sent: false,
                        orderEntries: formState.orderEntries.orderEntries.map((item) => ({
                            idEntry: item.idEntry,
                            itemState: item.itemState,
                            description: item.description.value,
                            amount: item.amount.value
                        }))
                    }
                    : order
            )

            setOrders(ordersUpdated);
            setCategory('all');
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        handleStateChangeUpdate(SlideTransition);
    }

    const handleSend = () => {

        const ordersUpdated = orders.map((order) =>
            order.numberEntity === formState.numberEntity.value
                ?
                {
                    ...order,
                    sent: true
                }
                : order
        )

        setOrders(ordersUpdated);
        handleStateChangeSend(SlideTransition);
    }

    useEffect(() => {
        setPrice(euro.format(Number(formState.totalAmount.value)))
    }, [formState.totalAmount])
    useEffect(() => {
        setOrderState(percent.format(Number(formState.orderState.value) / 100))
    }, [formState.orderState])

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="detail-headerBox">
            <div className="detail-orderInputsUp">
                <div className="detail-inputBox">
                    <label htmlFor="">Número</label>
                    <input
                        placeholder=""
                        name="numberEntity"
                        type="text"
                        value={formState.numberEntity.value}
                        readOnly
                    />
                </div>
                <div className="detail-inputBox">
                    <label htmlFor="">Proveedor</label>
                    <input
                        ref={inputRef}
                        name="provider"
                        type="text"
                        value={formState.provider.value}
                        className={`detail-dateField ${formState.provider.isValid && formState.provider.isTouched ?
                            'detail-borderGreen' :
                            !formState.provider.isValid && formState.provider.isTouched &&
                            'detail-borderRed'
                            }`}
                        onChange={(e) => {
                            handleProviderChange(e.target.value)
                        }}
                        disabled={false}
                    />
                    <div className="detail-invalid-feedback">
                        {
                            !formState.provider.isValid && formState.provider.isTouched && (
                                <CancelIcon style={{ color: 'red' }} />
                            )
                        }
                        {
                            formState.provider.isValid && formState.provider.isTouched && (
                                <CheckCircleIcon style={{ color: 'green' }} />
                            )
                        }
                    </div>
                </div>
                <div className="detail-inputBoxDate">
                    <label htmlFor="">Fecha</label>
                    <input
                        name="date"
                        type="Date"
                        value={formState.date.value}
                        className={`detail-dateField ${formState.date.isValid && formState.date.isTouched ?
                            'detail-borderGreen' :
                            !formState.date.isValid && formState.date.isTouched && 'detail-borderRed'
                            }`}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                    <div className="detail-invalid-feedback">
                        {
                            !formState.date.isValid && formState.date.isTouched && (
                                <CancelIcon style={{ color: 'red' }} />
                            )
                        }
                        {
                            formState.date.isValid && formState.date.isTouched && (
                                <CheckCircleIcon style={{ color: 'green' }} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="detail-orderInputsDown">
                <div className="detail-inputsGroup">
                    <div className="detail-inputBox">
                        <label htmlFor="">Importe Total</label>
                        <div className="detail-totalAmount">
                            <input
                                type="text"
                                name="totalAmount"
                                value={price}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="detail-inputBox detail-orderStateInfo">
                        <label htmlFor="">Estado</label>
                        <input type="text" value={orderState} />
                    </div>
                </div>
                {
                    !formState.sent && !orderSelected.sent ? (
                        <div className="buttonsGroup_info">
                            <div className="detail-buttonsGroup">
                                <button className="detail-updateOrderButton" onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}

                                >Guardar</button>
                                <button
                                    className={`sendButton ${formState.orderState.value == '100' ? 'sendActive' : 'sendDisabled'}`}
                                    disabled={formState.orderState.value == '100' ? false : true}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                        handleOrderSent();
                                    }}
                                >
                                    Enviar
                                </button>
                            </div>
                            <div>
                                <Alert severity="info">Guarda los cambios antes de enviar</Alert>
                            </div>
                        </div>
                    ) : (
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="alertSuccess">
                            El pedido a sido enviado correctamente
                        </Alert>
                    )
                }
            </div>
            <TransitionsSnackbar snackbarState={snackbarUpdate} handleStateChange={handleStateChangeUpdate} message={formValid ? 'El pedido se ha actualizado' : 'Tienes errores en el formulario'} />
            <TransitionsSnackbar snackbarState={snackbarSend} handleStateChange={handleStateChangeSend} message="El pedido se ha enviado" />
        </div>
    )
}