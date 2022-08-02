export interface CalendarEvent {
  id?: string;
  groupId?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  startStr?: string;
  endStr?: string;
  title?: string;
  url?: string;
  classNames?: Array<string>;
  editable?: boolean;
  startEditable?: boolean;
  durationEditable?: boolean;
  resourceEditable?: boolean;
  display?:
    | 'auto'
    | 'block'
    | 'list-item'
    | 'background'
    | 'inverse-background'
    | 'none';
  overlap?: boolean;
  constraint?: any;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: any;
  source?: any;
}

export interface Calendar {
  getEvents: () => Array<CalendarEvent>;
  getEventById: (id: string) => CalendarEvent | undefined | null;
  addEvent: (event: CalendarEvent, source?: any) => void;
  render: () => void;
}
