import { format } from 'date-fns';

type DateFormat =
  | 'dd/MM/yyyy'
  | 'dd-MM-yyyy'
  | 'yyyy-MM-dd'
  | 'yyyy/MM/dd'
  | 'yyyy-MM-dd HH:mm:ss';

export const formatDate = (date: string | Date, dateFormat: DateFormat) => {
  let dateObj;

  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  const utcDate = new Date(
    dateObj.toLocaleString('en-US', { timeZone: 'UTC' }),
  );

  return format(utcDate, dateFormat);
};
