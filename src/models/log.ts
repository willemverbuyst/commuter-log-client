import type { MeansOfTransport, StatusOfDay } from '../constants';

export type MeansOfTransport =
  typeof MeansOfTransport[keyof typeof MeansOfTransport];

export type StatusOfDay = typeof StatusOfDay[keyof typeof StatusOfDay];

export type Log = {
  _id: string;
  date: Date;
  userId: string;
  weekNumber: number;
  statusOfDay: StatusOfDay;
  durationTrip: number;
  meansOfTransport: MeansOfTransport;
  startingPoint: string;
  destination: string;
  meta: {
    job: string;
    __v: number;
  };
};
