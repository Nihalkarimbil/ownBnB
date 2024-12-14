import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Callender({ onDateSelect }) {
  const handleDateChange = (date) => {
    onDateSelect(date.format("YYYY-MM-DD")); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={handleDateChange} />
    </LocalizationProvider>
  );
}
