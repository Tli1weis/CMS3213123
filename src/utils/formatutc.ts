import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export function formatUTC(utcString: string, format = 'YY-MM-DD HH:mm:ss') {
  const res = dayjs(utcString).utcOffset(8).format(format);
  return res;
}
