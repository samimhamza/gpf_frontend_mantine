"use client";

import { Box, Input, TextInput } from "@mantine/core";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalali_fa from "@/jalali_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface PersianDatePicker {
	label: string;
	placeholder: string;
	value: any;
	onChange: any;
	errorMessage?: string;
	dateTime?: boolean;
	maxDate?: number | undefined;
	isRequired?: boolean;
}

const PersianDatePicker = ({
	label,
	placeholder,
	value,
	onChange,
	errorMessage,
	dateTime = false,
	maxDate = undefined,
	isRequired = true,
}: PersianDatePicker) => {
	return (
		<Box style={{ flex: 1 }}>
			<Box style={{ display: "flex" }}>
				<DatePicker
					zIndex={1000}
					portal
					style={{
						width: "100%",
						boxSizing: "border-box",
						height: "36px",
						borderRadius: "4px",
					}}
					containerStyle={{ flex: 1 }}
					calendar={persian}
					locale={jalali_fa}
					calendarPosition="bottom-right"
					value={value}
					onChange={onChange}
					render={
						<TextInput
							label={label}
							placeholder={placeholder}
							withAsterisk={isRequired}
							error={errorMessage ? true : false}
						/>
					}
					format={`${dateTime ? "YYYY/MM/DD hh:mm A" : "YYYY/MM/DD"}`}
					plugins={
						dateTime
							? [<TimePicker key={1} position="bottom" hideSeconds />]
							: []
					}
					maxDate={maxDate}
				/>
			</Box>
			{errorMessage && (
				<Box pt={3}>
					<Input.Error>{errorMessage}</Input.Error>
				</Box>
			)}
		</Box>
	);
};

export default PersianDatePicker;
