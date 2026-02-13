export const formatDateTimeDisplay = (dateString?: string | null) => {
  if (!dateString) return '';

  const [datePart, timePartRaw] = dateString.split('T');
  if (!datePart || !timePartRaw) return dateString;

  const timePart = timePartRaw.split('.')[0]; // 밀리초 제거

  const [year, month, day] = datePart.split('-');
  const [hourStr = '00', minute = '00', second = '00'] = timePart.split(':');

  let hour = Number(hourStr);
  const period = hour >= 12 ? '오후' : '오전';

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  return `${year}. ${Number(month)}. ${Number(day)}. ${period} ${hour}:${minute}:${second}`;
};
