import ics, { EventAttributes } from 'ics';

const emojis = {
  'hidratação': '💧',
  'nutrição': '🥦',
  'restauração': '🏗️',
}

export default function generateGoogleCalendarICS(schedule: Array<[Date, Procedure]>) {
  const events: EventAttributes[] = [];

  schedule.forEach(([startDate, procedure]) => {
    const formattedDate: EventAttributes['start'] = [
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate(),
      startDate.getHours(),
      startDate.getMinutes()
    ];
    events.push({
      title: `${emojis[procedure]} ${procedure.charAt(0).toUpperCase()}${procedure.slice(1)}`,
      description: 'Haircare routine for today.',
      categories: ['haircare routine', procedure],
      start: formattedDate,
      duration: { minutes: 30 }
    });
  });

  return ics.createEvents(events);

  // if(error) {
  //   console.error('Error generating calendar:', error);
  //   return;
  // }

  // const filename = `schedule_${new Date().toISOString()}.ics`;
  // const file = new File([value], filename, { type: 'text/calendar' });
  // return URL.createObjectURL(file);
}
