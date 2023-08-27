import { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import s from './select.module.css';

function ReactSelect({ id, placeholder, value, onChange, options, disabled }) {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (selectedOption) onChange(selectedOption.value);
  }, [onChange, selectedOption]);

  const classNames = {
    control: () => s.control,
    menu: () => s.menu,
    option: () => s.option,
    input: () => s.input,
  };

  return (
    <div className={disabled ? s.select_disabled : s.select_container}>
      {options && (
        <Select
          id={id}
          // defaultValue={options[0]}
          placeholder={placeholder}
          value={options.find((item) => item.value === value)}
          onChange={setSelectedOption}
          options={options}
          isDisabled={disabled}
          classNames={classNames}
          unstyled
        />
      )}
    </div>
  );
}

export default ReactSelect;

ReactSelect.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  disabled: PropTypes.bool,
};

ReactSelect.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
};
