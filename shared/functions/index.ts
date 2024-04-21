import * as moment from "jalali-moment";
import { DateObject } from "react-multi-date-picker";

export const getDateTime = (utcTime: string) => {
  return moment.utc(utcTime).isValid()
    ? moment.utc(utcTime).local().locale("fa").format("YYYY-MM-DD hh:mm:ss A")
    : "";
};

export const getTimeValue = (utcTime: string) => {
  return moment.utc(utcTime).isValid()
    ? moment.utc(utcTime).local().locale("fa").valueOf()
    : "";
};

export const getDate = (utcDate: string) => {
  return moment.utc(utcDate).isValid()
    ? moment.utc(utcDate).local().locale("fa").format("YYYY-MM-DD")
    : "";
};

export const getYear = (utcDate: string) => {
  return moment.utc(utcDate).isValid()
    ? moment.utc(utcDate).local().locale("fa").format("YYYY")
    : "";
};

export const getTime = (date: any) => {
  return date instanceof DateObject
    ? date?.toDate?.().getTime()
    : date instanceof Date
    ? date.getTime()
    : typeof date == "string"
    ? new Date(date).getTime()
    : date;
};

export const isObject = (variable: any) => {
  return (
    typeof variable === "object" &&
    !Array.isArray(variable) &&
    variable !== null
  );
};

export const getFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    let keyName = key;
    if (Array.isArray(data[key])) {
      keyName = key.toString() + "[]";
      data[key].forEach((value: any) => {
        if (value instanceof File) {
          formData.append(keyName, value);
        } else if (isObject(value)) {
          formData.append(keyName, JSON.stringify(value));
        } else {
          formData.append(keyName, value);
        }
      });
    } else if (isObject(data[keyName])) {
      if (data[keyName] instanceof File) {
        formData.append(keyName, data[keyName]);
      } else {
        formData.append(keyName, JSON.stringify(data[keyName]));
      }
    } else {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(keyName, data[key]);
      }
    }
  });
  return formData;
};

export const addLeadingZeros = (number: number | string) => {
  let numberStr = number?.toString();
  if (numberStr.length < 4) {
    let zerosNeeded = 4 - numberStr.length;
    numberStr = "0".repeat(zerosNeeded) + numberStr;
  }
  return numberStr;
};

export const getID = (
  office_code: string,
  created_at: string,
  id: number | string
) => {
  return `GPF-${office_code}-${getYear(created_at)}-${addLeadingZeros(id)}`;
};

export const getDatabaseID = (id: string): number => {
  let parts = id.split("-");
  return parseInt(parts[parts.length - 1]);
};

// Sample of checking uniqueness of multiple insert
// const checkUniqueness = async () => {
// 	const data: any = {
// 		warehouse_id: warehouseId,
// 		id: editId ? editId : null,
// 	};
// 	if (editId) {
// 		data.item_id = form.values.item_id;
// 	} else {
// 		data.item_ids = form.values.items.map((item: any) => item.item_id);
// 	}
// 	let { response, status } = await callApi({
// 		method: "POST",
// 		url: "/warehouse_items/check_uniqueness",
// 		data: data,
// 	});
// 	if (status == 226) {
// 		if (editId) {
// 			form.setErrors({
// 				item_id: t("value_already_exists"),
// 			});
// 		} else {
// 			let indexes = form.values.items.map(
// 				(
// 					item: {
// 						warehouse_id: number | undefined;
// 						item_id: string;
// 						quantity: string;
// 						store_date: Value;
// 						unit: string;
// 					},
// 					index: number
// 				) => {
// 					const i = response.message.findIndex(
// 						(item_id: string) => item_id == item.item_id
// 					);
// 					if (i != -1) {
// 						return index;
// 					}
// 				}
// 			);
// 			let errors: any = {};
// 			indexes.forEach((index: number) => {
// 				errors[`items.${index}.item_id`] = t("value_already_exists");
// 			});
// 			form.setErrors(errors);
// 		}
// 		return false;
// 	} else if (status !== 200) return false;
// 	return true;
// };
