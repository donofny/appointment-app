export interface Appointment {
  id?: number;
  userID?: number;
  created: Date;
  lastChanged: Date;
  start: Date;
  duration: number;
  name: string;
  description: string;
}
