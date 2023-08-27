// import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import s from './textArea.module.css';

function TextArea({
  id,
  label,
  placeholder,
  value,
  onChange,
  minLength,
  maxLength,
  autoCorrect,
  readOnly,
  required,
  disabled,
  pattern,
}) {
  // const textAreaRef = useRef(null);

  const handleChange = (e) => onChange(e.target.value);

  // Автоподбор высоты по контенту
  // useEffect(() => {
  //   textAreaRef.current.style.height = 'auto';
  //   textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  // }, [value]);

  return (
    <div className={disabled ? s.textarea_disabled : s.textarea_container}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        minLength={minLength}
        maxLength={maxLength}
        autoCorrect={autoCorrect}
        required={required}
        disabled={disabled}
        pattern={pattern}
        className={s.textarea}
        // ref={textAreaRef}
      />
    </div>
  );
}

export default TextArea;

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  placeholder: PropTypes.node,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  autoCorrect: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
};

TextArea.defaultProps = {
  label: '',
  placeholder: '',
  onChange: () => {},
  autoCorrect: 'true',
  minLength: 0,
  maxLength: 1024,
  readOnly: false,
  required: false,
  disabled: false,
  pattern: null,
  // pattern: '(.*?)',
};
