export interface OrderInfo {
  number: number;
  provider: string;
  date: string;
  sent: boolean;
}

export interface OrderDetail {
  numberEntity: string;
  provider: string;
  date: string;
  totalAmount: number;
  orderState: string;
  sent: boolean;
  orderEntries: Entries[];
}

export interface ErrorHandleOrder {
  provider: string;
  date: string;
  totalAmount: number;
  orderState: number;
  orderEntries: Entries[];
}

export interface Entries {
  idEntry: string;
  itemState: boolean;
  description: string;
  amount: number;
}

export type UpdatePayloadField = {
  position: number;
  field: keyof Entries;
  value: Entries[keyof Entries];
};

export interface OrderHeader {
  numberEntity: number;
  provider: string;
  date: string;
  totalAmount: number;
  orderState: number;
  sent: boolean;
}

export interface OrderEntriesIn {
  orderEntries: Entries[];
}

export interface OrderDetailEntriesReducer {
  idEntry: string;
  itemState: boolean;
  description: {
    value: string;
    isTouched: boolean;
    isValid: boolean;
  };
  amount: {
    value: number;
    isTouched: boolean;
    isValid: boolean;
  };
}

export interface OrderDetailReducer {
  numberEntity: {
    value: string;
  };
  provider: {
    value: string;
    isValid: boolean;
    isTouched: boolean;
  };
  date: {
    value: string;
    isValid: boolean;
    isTouched: boolean;
  };
  totalAmount: {
    value: number;
  };
  sent: boolean;
  orderState: {
    value: string;
    isValid: boolean;
  };
  orderEntries: {
    orderEntries: OrderDetailEntriesReducer[];
  };
}
