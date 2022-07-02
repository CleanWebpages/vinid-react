import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
	field, value, label, error, type, onChange, onBlur,
	disabled, placeholder = '',
}) => (
	<div className={classnames('form-group', { 'has-danger': error })}>
		<label className="control-label">{label}</label>
		<input
			onChange={onChange}
			onBlur={onBlur}
			value={value}
			type={type}
			name={field}
			disabled={disabled}
			autoComplete=""
			autoCapitalize="none"
			autoCorrect="off"
			placeholder={placeholder}
			className={classnames('form-control text-left', { 'form-control-danger': error })}
		/>
		{error && <span className="form-control-feedback">{error}</span>}
	</div>

);

export default TextFieldGroup;
