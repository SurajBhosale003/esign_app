import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en-gb';

dayjs.extend(relativeTime);
dayjs.locale('en-gb');

export default dayjs;
