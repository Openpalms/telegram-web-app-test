import React, { useCallback, useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import { useTelegram } from '../../hooks/useTelegram';

interface TimePickerProps {
  onClose: () => void;
}

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { telegram, hideBtn, showBtn, id } = useTelegram();
  const [valueGroups, setValueGroups] = useState({
    hours: '00',
    minutes: '00',
  });

  const optionGroups = {
    hours: [...Array(24).keys()].map((hour) => String(hour).padStart(2, '0')),
    minutes: [...Array(60).keys()].map((minute) =>
      String(minute).padStart(2, '0')
    ),
  };
  const handleChange = (name: any, value: any) => {
    setValueGroups((prevValueGroups) => ({
      ...prevValueGroups,
      [name]: value,
    }));
  };

  //   const handleMainBtnClick = useCallback(() => {
  //     const data = {
  //       hours: valueGroups.hours,
  //       minutes: valueGroups.minutes,
  //       id,
  //     };
  //     telegram.sendData(JSON.stringify(data));
  //     fetch('peacefulloosemotion.openpalms.repl.co', {
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
      hideBtn();
    } else showBtn();
  }, [valueGroups]);

  useEffect(() => {
    telegram.onEvent('MainButtonClicked', handleSendData);
    return () => {
      telegram.offEvent('MainButtonClicked', handleSendData);
    };
  }, [telegram, handleSendData]);

  return (
    <div className="Test">
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
        height={400}
        itemHeight={50}
        wheel={'normal'}
      />
    </div>
  );
};
