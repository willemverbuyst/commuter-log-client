export const routes = ['Terneuzen', 'Tilburg', 'Vlissingen'];

export const MeansOfTransport = {
  CAR: 'CAR',
  PUBLIC_TRANSPORT: 'PUBLIC_TRANSPORT',
  NONE: 'NONE',
} as const;

export const MeansOfTransportDisplay = {
  CAR: 'car',
  PUBLIC_TRANSPORT: 'public transport',
  NONE: 'none',
} as const;

export const StatusOfDay = {
  DAY_OFF: 'DAY_OFF',
  WORKING_AT_THE_OFFICE: 'WORKING_AT_THE_OFFICE',
  WORKING_FROM_HOME: 'WORKING_FROM_HOME',
} as const;

export const StatusOfDayDisplay = {
  DAY_OFF: 'day off',
  WORKING_AT_THE_OFFICE: 'working at the office',
  WORKING_FROM_HOME: 'working from home',
} as const;
