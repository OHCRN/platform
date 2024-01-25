function MyBooleanInput({ control, name }) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value, ref } }) => (
				<>
					<label>
						Oui
						<input
							type="radio"
							onBlur={onBlur} // notify when input is touched
							onChange={() => onChange(true)} // send value to hook form
							checked={value === true}
							inputRef={ref}
						/>
					</label>
					<label>
						Non
						<input
							type="radio"
							onBlur={onBlur} // notify when input is touched
							onChange={() => onChange(false)} // send value to hook form
							checked={value === false}
							inputRef={ref}
						/>
					</label>
				</>
			)}
		/>
	);
}
