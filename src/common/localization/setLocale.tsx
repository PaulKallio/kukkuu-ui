import moment from 'moment';
import 'moment/locale/fi';
import 'moment/locale/sv';

export type Locale = 'fi' | 'sv' | 'en';

function setLocale(locale: Locale) {
  moment.locale(locale);
}

export default setLocale;
