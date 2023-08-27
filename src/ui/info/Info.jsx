import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import s from './info.module.css';

// Синтаксис <Info text="подсказка Клики" positionHorizontal="center" />

function Info({ text, positionHorizontal, positionVertical, width }) {
  const infoTextRef = useRef(null);

  // Выравнивание блока текста по левому краю "I" или по центру
  useEffect(() => {
    if (positionHorizontal) {
      if (positionHorizontal === 'left') infoTextRef.current.style.left = '0';
      if (positionHorizontal === 'center')
        infoTextRef.current.style.left = '-155px';
    }
  }, [positionHorizontal]);

  // Выравнивание блока текста по высоте
  useEffect(() => {
    if (positionVertical) {
      if (positionVertical === 'top') infoTextRef.current.style.top = '0';
    }
  }, [positionVertical]);

  // Изменяю ширину блока текста, если не помещается
  useEffect(() => {
    if (width) infoTextRef.current.style.width = `${width}px`;
  }, [width]);

  return (
    <div className={s.info}>
      <div className={s.info_text} ref={infoTextRef}>
        {text}
      </div>
    </div>
  );
}

export default Info;

Info.propTypes = {
  text: PropTypes.string,
  positionHorizontal: PropTypes.string,
  positionVertical: PropTypes.string,
  width: PropTypes.string,
};

Info.defaultProps = {
  text: '',
  positionHorizontal: '',
  positionVertical: '',
  width: '',
};
