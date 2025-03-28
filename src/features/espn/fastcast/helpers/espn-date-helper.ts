import { SmartDate } from '@shared/helpers/smart-date/smart-date';
import * as DateFns from 'date-fns';
import { enUS } from 'date-fns/locale';
import { FASTCAST_DATE_SHORT } from '../../constants';

export class EspnDateHelper extends SmartDate {
  tickerDate(time: number): string {
    return DateFns.format(time, FASTCAST_DATE_SHORT, { locale: enUS });
  }
}
