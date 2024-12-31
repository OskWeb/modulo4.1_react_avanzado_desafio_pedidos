import { Entries, OrderDetailEntriesReducer, OrderDetailReducer, UpdatePayloadField } from "../../../core/interfaces/Order"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { calculateTotal, substractTotal } from "../../../common-app/calculationFunctions";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface data {
    handleAddEntry: (payload: Entries) => void,
    handleUpdateEntryField: (payload: UpdatePayloadField) => void,
    handleTotalAmountChange: (payload: number) => void,
    handleDeleteEntry: (payload: number) => void,
    handleUpdateEntriesState: (payload: OrderDetailEntriesReducer[]) => void,
    handleUpdateOrderState: () => void,
    formState: OrderDetailReducer
}

export const ListOrder = ({
    handleAddEntry,
    handleUpdateEntryField,
    handleTotalAmountChange,
    handleDeleteEntry,
    handleUpdateEntriesState,
    handleUpdateOrderState,
    formState
}: data) => {

    const [checked, setCheked] = useState(
        new Array(formState.orderEntries.orderEntries.length).fill(false)
    )

    const handleOnChangeCheckbox = (position: number) => {
        const updatedCheckedState = checked.map((item, index) =>
            index === position ? !item : item
        );

        setCheked(updatedCheckedState);
    }

    const [selected, setSelected] = useState('');

    const handleToggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newSelected: string,
    ) => {
        setSelected(newSelected);
    }

    const updateEntriesState = () => {
        const entriesUpdated = checked.map((position, index) => {
            return position === true ? (
                selected == 'Validar' ? { ...formState.orderEntries.orderEntries[index], itemState: true } :
                    selected == 'Invalidar' ? { ...formState.orderEntries.orderEntries[index], itemState: false } :
                        { ...formState.orderEntries.orderEntries[index] }
            ) : { ...formState.orderEntries.orderEntries[index] }
        })

        handleUpdateEntriesState(entriesUpdated);
    }

    useEffect(() => {
        updateEntriesState();
    }, [selected])



    useEffect(() => {
        handleUpdateOrderState();
    }, [formState.orderEntries])

    return (
        <div className='detail-OrdersListDetail'>
            <ToggleButtonGroup
                value={selected}
                exclusive
                onChange={handleToggleChange}
            >
                <ToggleButton
                    value={"Validar"}
                >
                    Validar
                </ToggleButton>
                <ToggleButton
                    value={"Invalidar"}
                >
                    Invalidar
                </ToggleButton>
            </ToggleButtonGroup>
            <div className="detail-orderEntriesBox">
                <div className="detail-order-wrap">
                    <div className="detail-orderEntries">
                        <div className="detail-itemsDataList">
                            <div className="labelBox">
                                <div>
                                    <label className="label">Estado</label>
                                </div>
                                <div>
                                    <label className="label">Descripción</label>
                                </div>
                                <div>
                                    <label className="label">Importe</label>
                                </div>
                            </div>
                            {formState.orderEntries.orderEntries.map((item, index) => (
                                <div className="detail-itemData" key={item.idEntry}>
                                    <span className='detail-positionNumber'>{index + 1}.</span>
                                    <div className="detail-checkStateContainer">
                                        <div className="detail-checkbox">
                                            <input
                                                type="checkbox"
                                                name={item.description.value}
                                                className="detail-checkbox-item"
                                                value={`orderEntries.orderEntries[${index}].description`}
                                                onChange={() => handleOnChangeCheckbox(index)}
                                            />
                                        </div>
                                        <div className="detail-orderState">
                                            <input
                                                className="detail-inputItem"
                                                value={item.itemState ? 'Valido' : 'Pendiente'}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="detail-descriptionBox">
                                        <input
                                            type="text"
                                            name={`formState.orderEntries.orderEntries[${index}].description`}
                                            value={item.description.value}
                                            className={`detail-inputItem ${formState.orderEntries.orderEntries[index].description.isValid
                                                &&
                                                formState.orderEntries.orderEntries[index].description.isTouched
                                                ? 'detail-borderGreen'
                                                : formState.orderEntries.orderEntries[index].description.isTouched &&
                                                !formState.orderEntries.orderEntries[index].description.isValid
                                                && 'detail-borderRed'
                                                }`}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                handleUpdateEntryField({ position: index, field: 'description', value })
                                            }}
                                        />
                                        <div className="detail-invalid-feedback">
                                            {
                                                !item.description.isValid && item.description.isTouched && (
                                                    <CancelIcon style={{ color: 'red' }} />
                                                )
                                            }
                                            {
                                                item.description.isValid && item.description.isTouched && (
                                                    <CheckCircleIcon style={{ color: 'green' }} />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="detail-amountBox">
                                        <input
                                            name={`orderEntries.orderEntries[${index}].amount`}
                                            type="number"
                                            value={item.amount.value}
                                            className={`detail-inputItem ${formState.orderEntries.orderEntries[index].amount.isValid
                                                &&
                                                formState.orderEntries.orderEntries[index].amount.isTouched
                                                ? 'detail-borderGreen'
                                                : formState.orderEntries.orderEntries[index].amount.isTouched &&
                                                !formState.orderEntries.orderEntries[index].amount.isValid
                                                && 'detail-borderRed'
                                                }`}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const totalAmount = calculateTotal(
                                                    formState.orderEntries,
                                                    index,
                                                    value
                                                );
                                                handleUpdateEntryField({ position: index, field: 'amount', value: value });
                                                handleTotalAmountChange(totalAmount);
                                            }}
                                        />
                                        <div className="detail-invalid-feedback">
                                            {
                                                !item.amount.isValid && item.amount.isTouched && (
                                                    <CancelIcon style={{ color: 'red' }} />
                                                )
                                            }
                                            {
                                                item.amount.isValid && item.amount.isTouched && (
                                                    <CheckCircleIcon style={{ color: 'green' }} />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <button className="detail-deleteItem"
                                        onClick={() => {
                                            const totalAmount = substractTotal(formState.totalAmount.value, formState.orderEntries.orderEntries[index].amount.value);
                                            handleDeleteEntry(index);
                                            handleTotalAmountChange(totalAmount);
                                            setCheked(checked.filter((position, i) => i !== index));
                                        }}
                                        disabled={formState.orderEntries.orderEntries.length === 1}
                                    >
                                        <RemoveCircleIcon />
                                    </button>
                                </div>
                            ))
                            }
                            <div className='detail-addFieldBox'>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newEntry = { idEntry: uuidv4(), description: "", itemState: false, amount: 0 };
                                        handleAddEntry(newEntry);
                                        setCheked([...checked, false]);
                                    }
                                    }>
                                    <AddIcon className='detail-addIcon' /> Añadir entrada
                                </button>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    )
}