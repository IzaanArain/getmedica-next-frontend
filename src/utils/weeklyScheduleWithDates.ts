import { startOfWeek, addDays, format } from "date-fns";

export const weeklyScheduleWithDates = () => {
  // using date fns to get week dates
  const weekStartDayWithCurrentDate = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });
  const weekEndDay = addDays(new Date(weekStartDayWithCurrentDate), 6);
  // const week = Array.from({ length: 7, },(_,i)=> {
  //     const dateTime = addDays(new Date(weekStartDay), i);
  //     const day = format(dateTime, 'EEEE');
  //     const date = format(dateTime, 'dd');
  //     return { date, day: day.slice(0,3).toUpperCase() }
  // });
  const week = [...new Array(7)].map((_, i) => {
    const dateTime = addDays(new Date(weekStartDayWithCurrentDate), i);
    const day = format(dateTime, "EEEE");
    const date = format(dateTime, "dd");
    return { date, day: day };
  });

  return week;
};