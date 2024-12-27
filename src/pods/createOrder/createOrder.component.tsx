import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './createOrder.css'
import { useContext, useState } from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray } from 'formik';
import { parse } from "date-fns/parse";
import { v4 as uuidv4 } from "uuid";
import { OrdersContext } from '../../core/context/ordersContext';
import { Errors } from './components/errors.component';
import { InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EuroIcon from '@mui/icons-material/Euro';
import { BackButton } from '../../common/backButton';
import { SlideTransition, TransitionsSnackbar } from '../../common/transitionSnackbar';
import { euro } from '../../core/utils/formatters.util';
import { TransitionProps } from '@mui/material/transitions';

const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
}

const orderSchema = Yup.object().shape({
    provider: Yup.string()
        .min(3, 'Al menos 3 caracteres')
        .max(50, 'Máximo 50 caracteres')
        .required('Introduce un proveedor'),
    date: Yup.date()

        .transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value;
            }
            const result = parse(originalValue, "dd.MM.yyyy", new Date());
            return result;
        })
        .typeError("please enter a valid date")
        .required()
        .min(getDate(), 'La fecha tiene que ser mayor a la actual'),
    orderEntries: Yup.array()
        .of(
            Yup.object({
                description: Yup.string()
                    .min(3, 'Al menos 3 caracteres')
                    .max(120, 'Máximo 120 caracteres')
                    .required('Introduce una descripción'),
                amount: Yup.number()
                    .min(1, 'El importe debe de ser mayor que 0')
                    .required('Debes de introducir un importe')
            })
        )
});

export const CreateOrderComponent = () => {

    const context = useContext(OrdersContext);
    const { orders, setOrders, setCategory } = context;

    const [snackbar, setSnackbar] = useState<snackbarType>({
        open: false,

    });

    const handleStateChange = (
        transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >
    ) => {
        setSnackbar({
            open: !snackbar.open,
            transition,
        });
    }

    const calculateTotal = (values, currentIndex, currentValue) => {
        return values.orderEntries.reduce((total, entry, index) => {
            if (index === currentIndex) {
                return total + (Number(currentValue) || 0);
            }
            return total + (Number(entry.amount) || 0);
        }, 0);
    }

    const substractTotal = (values, currentValue) => {
        return values.totalAmount - currentValue;
    }

    const handleSubmit = async (values) => {
        const data = {
            numberEntity: values.numberEntity,
            provider: values.provider,
            date: values.date,
            totalAmount: values.totalAmount,
            orderState: '',
            sent: false,
            orderEntries: values.orderEntries
        };

        console.log(data);
        setOrders([...orders, data]);
        setCategory('all');
        handleStateChange(SlideTransition);
    }



    return (
        <div className="createOrderPage">
            <BackButton />
            <div>
                <h2 className="title">
                    Pedido a proveedor
                </h2>
                <Formik initialValues={{
                    numberEntity: uuidv4(),
                    provider: '',
                    date: '',
                    totalAmount: 0,
                    orderState: 0,
                    orderEntries: [{
                        idEntry: uuidv4(),
                        description: "",
                        //itemState: 0,
                        amount: 0,
                    }]
                }}
                    validationSchema={orderSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, isValid }) => (
                        <>
                            <Form>
                                <div className="createOrderPageBox">
                                    <div className="orderInputsUp">
                                        <div className="inputBox">
                                            <label htmlFor="">Número</label>
                                            <Field
                                                placeholder=""
                                                name="numberEntity"
                                                type="text"
                                                value={values.numberEntity}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="inputBox">
                                            <label htmlFor="">Proveedor</label>
                                            <Field
                                                name="provider"
                                                type="text"
                                                as={TextField}
                                                className="provider"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end' style={{ outline: 'none' }}>
                                                            {errors.provider && touched.provider && (
                                                                <CancelIcon style={{ color: 'red' }} />
                                                            )}
                                                            {!errors.provider && touched.provider && (
                                                                <CheckCircleIcon style={{ color: 'green' }} />
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{
                                                    '& fieldset': {
                                                        borderColor: touched['provider'] ? (!errors['provider'] ? 'green' : 'red') : ''
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="inputBox">
                                            <label htmlFor="">Fecha</label>
                                            <Field
                                                name="date"
                                                type="date"
                                                as={TextField}
                                                className="dateField"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end' style={{ outline: 'none' }}>
                                                            {errors.date && touched.date && (
                                                                <CancelIcon style={{ color: 'red' }} />
                                                            )}
                                                            {!errors.date && touched.date && (
                                                                <CheckCircleIcon style={{ color: 'green' }} />
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{
                                                    '& fieldset': {
                                                        borderColor: touched['date'] ? (!errors['date'] ? 'green' : 'red') : ''
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="orderInputsDown">
                                        <div className="inputBox">
                                            <label htmlFor="">Importe Total</label>
                                            <Field
                                                type="text"
                                                name="totalAmount"
                                                value={euro.format(values.totalAmount)}
                                                as={TextField}
                                                readOnly={true}
                                                InputProps={{
                                                    readOnly: true,
                                                    endAdornment: (
                                                        <InputAdornment position='start'>
                                                            <EuroIcon />
                                                        </InputAdornment>
                                                    )
                                                }}

                                            />
                                        </div>
                                        <button type="submit">Crear Pedido</button>
                                    </div>
                                </div>
                                <div className='OrdersListCreate'>
                                    <div className='ordersListCreate-wrap'>
                                        <div className="itemsDesc">
                                            <div className="emptyBox"></div>
                                            <span className="description">Descripción</span>
                                            <span className="amount">Importe</span>
                                            <div className="emptyBox"></div>
                                        </div>
                                        <FieldArray name="orderEntries">
                                            {({ insert, remove, push }) => (
                                                <div className="itemsDataList">
                                                    {values.orderEntries.map((item, index) => (
                                                        <div className="itemData" key={item.idEntry}>
                                                            <span className='positionNumber'>{index + 1}.</span>
                                                            <div>

                                                                <Field
                                                                    name={`orderEntries[${index}].description`}
                                                                    type="text"

                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setFieldValue(`orderEntries[${index}].description`, value);
                                                                    }}
                                                                >
                                                                    {({
                                                                        field,
                                                                        form: { touched, errors },
                                                                        meta,
                                                                    }) => (
                                                                        <div className='generatedItemBox'>
                                                                            <input
                                                                                as={TextField}
                                                                                type="text"
                                                                                {...field}
                                                                                className={`inputItem ${meta.touched && meta.error ? 'errorBorder' : meta.touched && !meta.error && 'checkBorder'}`} />
                                                                            {meta.touched && meta.error && (
                                                                                <CancelIcon style={{ color: 'red' }} className='inputStateIcon' />
                                                                            )}
                                                                            {!meta.error && meta.touched && (
                                                                                <CheckCircleIcon style={{ color: 'green' }} className='inputStateIcon' />
                                                                            )}

                                                                        </div>
                                                                    )}

                                                                </Field>

                                                            </div>
                                                            <div>
                                                                <Field
                                                                    name={`orderEntries[${index}].amount`}
                                                                    type="number"


                                                                >
                                                                    {({
                                                                        field,
                                                                        form: { touched, errors },
                                                                        meta,
                                                                    }) => (
                                                                        <div className='generatedItemBox'>
                                                                            <input type="number"
                                                                                {...field}
                                                                                className={`inputItem ${meta.touched && meta.error ? 'errorBorder' : meta.touched && !meta.error && 'checkBorder'}`}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;

                                                                                    setFieldValue(`orderEntries[${index}].amount`, value);

                                                                                    const totalAmount = calculateTotal(
                                                                                        values,
                                                                                        index,
                                                                                        value
                                                                                    );
                                                                                    console.log(values.orderEntries[0].amount);
                                                                                    setFieldValue("totalAmount", totalAmount);

                                                                                }}

                                                                            />

                                                                            {meta.touched && meta.error && (
                                                                                <CancelIcon style={{ color: 'red' }} className='inputStateIcon' />
                                                                            )}
                                                                            {!meta.error && meta.touched && (
                                                                                <CheckCircleIcon style={{ color: 'green' }} className='inputStateIcon' />
                                                                            )}

                                                                        </div>
                                                                    )}

                                                                </Field>
                                                            </div>
                                                            <button className="deleteItem"
                                                                onClick={() => {
                                                                    console.log(values.orderEntries[index].amount);
                                                                    const totalAmount = substractTotal(values, values.orderEntries[index].amount);
                                                                    console.log(euro.format(totalAmount));
                                                                    setFieldValue("totalAmount", totalAmount);
                                                                    remove(index)
                                                                }}
                                                                disabled={values.orderEntries.length === 1}
                                                            >
                                                                <RemoveCircleIcon />
                                                            </button>
                                                        </div>
                                                    ))
                                                    }
                                                    <div className='addFieldBox'>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                push({ idEntry: uuidv4(), description: "", amount: "" });
                                                            }
                                                            }>
                                                            <AddIcon className='addIcon' /> Añadir entrada
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>

                                </div>
                                <TransitionsSnackbar snackbarState={snackbar} handleStateChange={handleStateChange} message='El pedido se ha creado' />
                            </Form>
                            <Errors errors={errors} touched={touched} values={values} isValid={isValid} />
                        </>
                    )}
                </Formik>
            </div>
        </div >
    )
}