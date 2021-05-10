import * as moment from 'moment';

export function parseUnixDate(unixDate:number,units:string): ParsedDateObject{
    let _date = (units) ? moment.unix(unixDate).format('MM-DD-YYYY') : moment.unix(unixDate).format('DD-MM-YYYY');
    let _day = moment.unix(unixDate).format('dddd');
    let _dayAsInteger = moment.unix(unixDate).format('DD');
    let _month = moment.unix(unixDate).format('MMMM');
    let _monthAsInteger = moment.unix(unixDate).format('MM');
    let _year = moment.unix(unixDate).format('yyyy');
    let _hour_24 = moment.unix(unixDate).format('H');
    let _hour_12 = moment.unix(unixDate).format("h");
    let _hourPeriod = moment.unix(unixDate).format('A');

    return {
        formatted_date:_date,
        weekday_as_unique_index:parseInt(_dayAsInteger.concat(_monthAsInteger)),
        day_name:_day,
        day:_dayAsInteger,
        month_name:_month,
        month:_monthAsInteger,
        year:_year,
        hour:_hour_12,
        hour24:_hour_24,
        hour_period:_hourPeriod,
    }
}