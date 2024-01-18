import dayjs from 'dayjs';

export const fillEmptyColoums = (
  columns: any,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
) => {
  const filledColumns = columns.slice(0);

  // 첫째날 앞에 공백 체우기
  let startDay = dayjs(start).get('day');
  for (let i = 0; i <= startDay; i++) {
    const date = dayjs(start).subtract(i, 'day');
    //unshifit 배열 맨 앞에 값을 등록
    filledColumns.unshift(date);
  }

  // 마지막날 이후 공백 채우기
  let endDay = dayjs(end).get('day');
  /*
    0 : 일요일
    1 : 월요일
    2 : 화요일
    3 : 수요일
    4 : 목요일
    5 : 금요일
    6 : 토요일
  */
  for (let i = 0; i < 6 - endDay; i++) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }

  return filledColumns;
};

export const getCalendarColumns = (now: any) => {
  const start = dayjs(now).startOf('month');
  const end = dayjs(now).endOf('month');
  const dayCount = dayjs(end).get('date'); //마지막 날짜만 가져온다.

  const columns = [];
  for (let i = 1; i < dayCount; i++) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  //console.log(`UTIL : ${columns}`);
  const fileledColumns = fillEmptyColoums(columns, start, end);
  return fileledColumns;
};
