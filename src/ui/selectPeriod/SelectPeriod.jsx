import { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import s from './selectPeriod.module.css';

function SelectPeriod({ id, value, onChange, options, disabled }) {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (selectedOption) onChange(selectedOption.value);
  }, [onChange, selectedOption]);

  const classNames = {
    control: () => s.control,
    menu: () => s.menu,
    option: () => s.option,
    input: () => s.input,
    singleValue: () => s.single_value,
  };

  return (
    <div className={disabled ? s.select_disabled : s.select_container}>
      {options && (
        <Select
          id={id}
          defaultValue={options[0]}
          value={options.find((item) => item.value === value)}
          onChange={setSelectedOption}
          options={options}
          isDisabled={disabled}
          classNames={classNames}
          unstyled
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      )}
    </div>
  );
}

export default SelectPeriod;

SelectPeriod.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  disabled: PropTypes.bool,
};

SelectPeriod.defaultProps = {
  value: '',
  disabled: false,
};
