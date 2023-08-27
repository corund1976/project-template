import PropTypes from 'prop-types';

import s from './input.module.css';

function Input({
  type,
  id,
  label,
  value,
  onChange,
  onInput,
  placeholder,
  autoComplete,
  minLength,
  maxLength,
  readOnly,
  required,
  disabled,
  pattern,
  step,
}) {
  const emailPattern = null;
  // const emailPattern = '([a-zA-Z0-9_.+-]+@[a-zA-Z_-]+?.[a-zA-Z]{2,6})';
  // имя = любые буквы, цифры, а также - и _
  // почт.сервер = любые буквы, а также - и _
  // домен = любые буквы в количестве от 2 до 6

  const passwordPattern = null;
  // const passworPattern = '([a-zA-Z0-9_.,!?+-]+)';
  // любые латинские буквы, цифры, а также - и _
  // знаки пунктуации ?!,.'

  let typicalPattern;

  if (type === 'email') typicalPattern = emailPattern;
  if (type === 'password') typicalPattern = passwordPattern;

  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className={disabled ? s.input_disabled : s.input_container}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        onInput={onInput}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        className={s.input}
        pattern={pattern || typicalPattern}
        step={step}
      />
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  autoComplete: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  step: PropTypes.number,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  onChange: () => {},
  onInput: () => {},
  placeholder: '',
  autoComplete: 'off',
  minLength: '0',
  maxLength: 1024,
  readOnly: false,
  required: false,
  disabled: false,
  pattern: null,
  // pattern: '(.*?)',
  step: null,
};
