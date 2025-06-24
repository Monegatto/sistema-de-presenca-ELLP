import { Weekday } from '../types/Weekday'

export function weekdaysStringToArray(weekdays: string): number[] {
  return weekdays
    .split(',')
    .map(day => Weekday[day.trim() as keyof typeof Weekday])
    .filter(day => typeof day === 'number');
}

export function getNextClassDate(weekdays: string, fromDate: Date = new Date()): Date | null {
  if (!weekdays) return null;
  const days = weekdaysStringToArray(weekdays);
  const today = fromDate.getDay();
  let minDiff = 7;

  for (const day of days) {
    let diff = (day - today + 7) % 7;
    if (diff === 0) diff = 7;
    if (diff < minDiff) {
      minDiff = diff;
    }
  }

  const nextDate = new Date(fromDate);
  nextDate.setDate(fromDate.getDate() + minDiff);
  return nextDate;
}