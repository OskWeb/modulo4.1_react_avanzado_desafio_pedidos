import * as Yup from "yup";
import { parse } from "date-fns/parse";
import { getDate } from "../../../common-app/calculationFunctions";

export const orderHeaderSchema = Yup.object().shape({
  provider: Yup.string()
    .min(3, "Al menos 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .required("Introduce un proveedor"),
  date: Yup.date()

    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("Introduce una fecha correcta")
    .required()
    .min(getDate(), "La fecha tiene que ser mayor a la actual"),
});
