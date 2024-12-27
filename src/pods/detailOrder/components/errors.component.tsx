import { OrderDetailReducer } from "../../../core/interfaces/Order"
import ErrorIcon from '@mui/icons-material/Error';

interface Data {
    formState: OrderDetailReducer
}

export const Errors = ({ formState }: Data) => {
    return (

        <div className="errors">
            {
                formState.provider.isTouched && !formState.provider.isValid && (
                    <div className="is-invalid">
                        <span>Proveedor</span>
                        <div className="errorMessage">
                            <span>Introduce una descripción de entre 3 y 50 caracteres</span>
                            <ErrorIcon />
                        </div>
                    </div>

                )
            }
            {
                formState.date.isTouched && !formState.date.isValid && (
                    <div className="is-invalid">
                        <span>Fecha</span>
                        <div className="errorMessage">
                            <span>Introduce una fecha superior a la actual</span>
                            <ErrorIcon />
                        </div>
                    </div>
                )
            }
            {
                formState.orderEntries.orderEntries.map((entry, index) =>
                    <div key={index}>
                        {
                            entry.description.isTouched && !entry.description.isValid && (
                                <div className="is-invalid">
                                    <span>Descripción {index + 1}</span>
                                    <div className="errorMessage">
                                        <span>Introduce una descripción de entre 3 y 50 caracteres</span>
                                        <ErrorIcon />
                                    </div>

                                </div>
                            )
                        }
                        {
                            entry.amount.isTouched && !entry.amount.isValid && (
                                <div className="is-invalid">
                                    <span>Importe {index + 1}</span>
                                    <div className="errorMessage">
                                        <span>Introduce un importe</span>
                                        <ErrorIcon />
                                    </div>

                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>




    )
}