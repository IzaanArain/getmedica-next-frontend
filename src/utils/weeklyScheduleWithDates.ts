import { WeeklyScheduleInterface } from "@/types";
import { startOfWeek, addDays, format } from "date-fns";

export const weeklyScheduleWithDates = (): WeeklyScheduleInterface[] => {
  // using date fns to get week dates
  const weekStartDayWithCurrentDate = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });
  const weekEndDay = addDays(new Date(weekStartDayWithCurrentDate), 6);
  // const week = Array.from({ length: 7, },(_,i)=> {
  //     const dateObj = addDays(new Date(weekStartDay), i);
  //     const day = format(dateObj, 'EEEE');
  //     const date = format(dateObj, 'dd');
  //     return { date, day: day.slice(0,3).toUpperCase() }
  // });
  const week = [...new Array(7)].map((_, i) => {
    const dateObj = addDays(new Date(weekStartDayWithCurrentDate), i);
    const day = format(dateObj, "EEEE");
    const date = format(dateObj, "dd");
    const fullDate = format(dateObj, "yyyy-MM-dd");
    return { date, day: day, fullDate };
  });

  return week;
};