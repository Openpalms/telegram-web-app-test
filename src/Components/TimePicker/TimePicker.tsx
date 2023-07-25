import React, { useEffect, useState } from 'react';
import Picker from 'react-mobile-picker';
import { useTelegram } from '../../hooks/useTelegram';

interface TimePickerProps {
  onClose: () => void;
}

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { onClose } = props;
  const { hideBtn, showBtn } = useTelegram();
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

  const selectedTime = `${valueGroups.hours}:${valueGroups.minutes}`;
  useEffect(() => {
    if (valueGroups.hours === '00' && valueGroups.minutes === '00') {
      hideBtn();
    } else showBtn();
  }, [valueGroups]);

  return (
    <div className="Test">
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
        height={300}
        itemHeight={50}
        wheel={'normal'}
      />
      {/* <button className="Btn" onClick={handleConfirm}>
        Подтвердить
      </button> */}
      <span>{selectedTime}</span>
    </div>
  );
};
