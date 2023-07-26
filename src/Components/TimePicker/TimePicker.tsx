import React, { useCallback, useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import { useTelegram } from '../../hooks/useTelegram';

export const TimePicker: React.FC = () => {
  const { telegram } = useTelegram();
  const [valueGroups, setValueGroups] = useState({
    hours: '00',
    minutes: '00',
  });
  const [shouldShowBtn, setShouldShowBtn] = useState(false);
  const optionGroups = {
    hours: [...Array(24).keys()].map((hour) => String(hour).padStart(2, '0')),
    minutes: [...Array(60).keys()].map((minute) =>
      String(minute).padStart(2, '0')
    ),
  };
  const handleChange = (name: any, value: any) => {
    setValueGroups((prevValueGroups: any) => ({
      ...prevValueGroups,
      [name]: value,
    }));
  };
  /// обработка мейнКнопки ( с сервером )
  //   const handleMainBtnClick = useCallback(() => {
  //     const data = {
  //       hours: valueGroups.hours,
  //       minutes: valueGroups.minutes,
  //       id,
  //     };
  //     telegram.sendData(JSON.stringify(data));
  //     fetch('localhost:8000', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   }, [valueGroups, id]);
  const handleSendData = useCallback(() => {
    const data = {
      hours: valueGroups.hours,
      minutes: valueGroups.minutes,
    };
    telegram.sendData(JSON.stringify(data));
  }, [valueGroups]);

  useEffect(() => {
    if (valueGroups.hours === '00' && valueGroups.minutes === '00') {
      setShouldShowBtn(false);
    } else setShouldShowBtn(true);
  }, [valueGroups]);

  useEffect(() => {
    telegram.onEvent('MainButtonClicked', handleSendData);
    return () => {
      telegram.offEvent('MainButtonClicked', handleSendData);
    };
  }, [handleSendData, telegram]);

  return (
    <div className="Test">
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
        height={550}
        itemHeight={60}
        wheel={'normal'}
      />
      {shouldShowBtn && (
        <button className="Btn" onClick={handleSendData}>
          Подтвердить
        </button>
      )}
    </div>
  );
};
