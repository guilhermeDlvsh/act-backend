import { add } from "date-fns";

class DateFunctions {
  date: Date;
  constructor(dateInISOString: string) {
    this.date = new Date(dateInISOString);
  }
  get() {
    return this.date.toISOString();
  }
  add(object: optionToAdd) {
    return add(this.date, object).toISOString();
  }
  set(value: string) {
    this.date = new Date(value);
  }
}
export default DateFunctions;

type optionToAdd = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
