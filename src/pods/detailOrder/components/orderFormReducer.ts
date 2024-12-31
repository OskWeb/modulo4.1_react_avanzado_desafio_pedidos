import {
  validateMaxLength,
  validateMinLength,
} from "../../../core/utils/validation.util";

export const actionTypes = {
  UPDATE_PROVIDER: "UPDATE_PROVIDER",
  UPDATE_DATE: "UPDATE_DATE",
  UPDATE_TOTALAMOUNT: "UPDATE_TOTALAMOUNT",
  UPDATE_ORDERSTATE: "UPDATE_ORDERSTATE",
  ADD_ENTRY: "ADD_ENTRY",
  UPDATE_ENTRY_FIELD: "UPDATE_ENTRY_FIELD",
  UPDATE_ENTRY_STATE: "UPDATE_ENTRY_STATE",
  DELETE_ENTRY: "DELETE_ENTRY",
  UPDATE_ORDER_SENT: "UPDATE_ORDER_SENT",
};

export const orderFormReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.UPDATE_PROVIDER: {
      const isValid =
        validateMinLength(payload, 3) && validateMaxLength(payload, 50);
      let { isTouched } = state.provider;
      if (!state.provider.isTouched) {
        if (state.provider.value.length >= 3) {
          isTouched = true;
        }
      }

      return {
        ...state,
        provider: {
          value: action.payload,
          isTouched,
          isValid,
        },
      };
    }

    case actionTypes.UPDATE_DATE: {
      const today = new Date();
      today.setDate(today.getDate());
      const formattedToday = today.toISOString().split("T")[0];

      const isValid = payload >= formattedToday ? true : false;
      let { isTouched } = state.date;
      if (!state.date.isTouched) {
        if (state.date.value.length >= 3) {
          isTouched = true;
        }
      }

      return {
        ...state,
        date: {
          value: action.payload,
          isTouched,
          isValid,
        },
      };
    }

    case actionTypes.UPDATE_ORDERSTATE: {
      const validated = state.orderEntries.orderEntries.filter(
        (entry) => entry.itemState == true
      );
      const orderStateUpdated =
        (validated.length * 100) / state.orderEntries.orderEntries.length;

      return {
        ...state,
        orderState: {
          value: orderStateUpdated,
        },
      };
    }

    case actionTypes.UPDATE_TOTALAMOUNT: {
      return {
        ...state,
        totalAmount: {
          value: action.payload,
        },
      };
    }

    case actionTypes.ADD_ENTRY: {
      return {
        ...state,
        orderEntries: {
          ...state.orderEntries,
          orderEntries: [...state.orderEntries.orderEntries, action.payload],
        },
      };
    }

    case actionTypes.UPDATE_ENTRY_FIELD: {
      const { position, field, value } = action.payload;

      let isValid = null;
      if (field == "description") {
        isValid = validateMinLength(value, 3) && validateMaxLength(value, 50);
      }

      if (field == "amount") {
        isValid = value > 0 ? true : false;
      }

      const updated = {
        ...state,
        orderEntries: {
          orderEntries: state.orderEntries.orderEntries.map((entry, index) =>
            index === position
              ? {
                  ...entry,
                  [field]: {
                    value,
                    isTouched: true,
                    isValid,
                  },
                }
              : entry
          ),
        },
      };

      return updated;
    }

    case actionTypes.DELETE_ENTRY: {
      return {
        ...state,
        orderEntries: {
          orderEntries: state.orderEntries.orderEntries.filter(
            (entry, index) => index !== action.payload
          ),
        },
      };
    }

    case actionTypes.UPDATE_ENTRY_STATE: {
      return {
        ...state,
        orderEntries: {
          orderEntries: action.payload,
        },
      };
    }

    case actionTypes.UPDATE_ORDER_SENT: {
      return {
        ...state,
        sent: !state.sent,
      };
    }
  }
};
