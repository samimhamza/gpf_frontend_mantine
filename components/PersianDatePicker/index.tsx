"use client";

import { Box, Input, TextInput } from "@mantine/core";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import jalali_fa from "@/jalali_fa";

interface PersianDatePicker {
	label: string;
	placeholder: string;
	value: any;
	onChange: any;
	errorMessage?: string;
}

const PersianDatePicker = ({
	label,
	placeholder,
	value,
	onChange,
	errorMessage,
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
							withAsterisk
							error={errorMessage ? true : false}
						/>
					}
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
