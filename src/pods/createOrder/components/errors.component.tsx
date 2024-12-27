import { ErrorMessage, FormikErrors, FormikTouched } from "formik"
import { useEffect, useRef, useState } from "react";
import { ErrorHandleOrder, OrderDetail } from "../../../core/interfaces/Order";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface data {
    errors: FormikErrors<OrderDetail>,
    touched: FormikTouched<OrderDetail>,
    values: ErrorHandleOrder,
    isValid: boolean
}

export const Errors = ({ errors, touched, values, isValid }: data) => {

    const [hasElementWithClass, setHasElementWithClass] = useState<boolean>(false);
    const ulRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {

        // if (!ulRef.current) return;

        // console.log(errors);

        // const observerCallback = (mutations: MutationRecord[]) => {
        //     const hasElement = Array.from(ulRef.current!.getElementsByClassName('errorLi')).length > 0
        //     setHasElementWithClass(hasElement);
        // };

        // const observer = new MutationObserver(observerCallback);

        // observer.observe(ulRef.current, {
        //     childList: true,
        //     subtree: true
        // });

        // return () => {
        //     observer.disconnect();
        // }

    }, [errors]);

    return (
        <>
            {
                !isValid && errors ? (
                    <div className='errorsBox'>

                        <ul ref={ulRef}>
                            {
                                <>
                                    <>
                                        {
                                            typeof errors.provider === 'string' && errors.provider.length > 0 && touched.provider && (
                                                <li className='errorLi'
                                                // ref={(el) => refs.current[0] = el}
                                                >
                                                    <span>Provider</span>
                                                    <div className="errorMessage">
                                                        <ErrorMessage
                                                            name={'provider'}
                                                            component="div"
                                                            className='field-error text-danger'
                                                        />
                                                        <ErrorIcon />
                                                    </div>

                                                </li>
                                            )
                                        }
                                    </>
                                    <>
                                        {

                                            typeof errors.date === 'string' && errors.date.length > 0 && touched.date && (
                                                <li className='errorLi'

                                                // ref={(el) => refs.current[1] = el}

                                                >
                                                    <span>Date</span>
                                                    <div className="errorMessage">
                                                        <ErrorMessage
                                                            name={'date'}
                                                            component="div"
                                                            className='field-error text-danger'
                                                        />
                                                        <ErrorIcon />
                                                    </div>

                                                </li>
                                            )
                                        }
                                    </>
                                    {
                                        values.orderEntries.map((entry, index) =>
                                            <div key={index}>
                                                {
                                                    errors.orderEntries &&
                                                        typeof errors.orderEntries[index] === 'object' &&
                                                        errors.orderEntries[index] &&
                                                        errors.orderEntries[index].description &&
                                                        touched.orderEntries &&
                                                        touched.orderEntries[index] &&
                                                        touched.orderEntries[index].description
                                                        ? (
                                                            <li className='errorLi'>
                                                                <span>Descripcion {index + 1}</span>
                                                                <div className="errorMessage">
                                                                    <ErrorMessage
                                                                        name={`orderEntries[${index}].description`}
                                                                        component="div"
                                                                        className='field-error text-danger'
                                                                    />
                                                                    <ErrorIcon />
                                                                </div>

                                                            </li>
                                                        ) : null
                                                }
                                                {
                                                    errors.orderEntries &&
                                                        typeof errors.orderEntries[index] === 'object' &&
                                                        errors.orderEntries[index] &&
                                                        errors.orderEntries[index].amount &&
                                                        touched.orderEntries &&
                                                        touched.orderEntries[index] &&
                                                        touched.orderEntries[index].amount
                                                        ? (
                                                            <li className='errorLi'
                                                            >
                                                                <span>Importe {index + 1}</span>
                                                                <div className="errorMessage">
                                                                    <ErrorMessage
                                                                        name={`orderEntries[${index}].amount`}
                                                                        component="div"
                                                                        className='field-error text-danger'
                                                                    />
                                                                    <ErrorIcon />
                                                                </div>

                                                            </li>
                                                        ) : null
                                                }
                                            </div>
                                        )
                                    }
                                </>
                            }
                        </ul>
                    </div>
                ) : null
            }
        </>
    )
}