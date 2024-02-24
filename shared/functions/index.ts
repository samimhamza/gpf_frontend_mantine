import * as moment from "jalali-moment";

export const getDateTime = (utcTime: string) => {
	return moment.utc(utcTime).local().locale("fa").format("YYYY-MM-DD HH:mm:ss");
};
