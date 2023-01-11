export default function Input({value, name, placeholder, type = "text", onChange, required = true, props}) {
	return (
		<input
			{...props}
			name={name}
			placeholder={placeholder}
			type={type}
			value={value}
			onChange={onChange}
			required={required}
		/>
	);
}
