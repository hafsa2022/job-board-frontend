import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayDifference',
})
export class DayDifferencePipe implements PipeTransform {
  transform(created_at: string): number {
    const createdDate = new Date(created_at);
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - createdDate.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }
}
