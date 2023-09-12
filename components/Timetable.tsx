import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import adaptivePlugin from '@fullcalendar/adaptive';
import styles from '@/styles/Timetable.module.css';
import dates from '@/pages/api/dates.json';

export default function Timetable() {
  const events = dates.map((event) => ({
    title: event.title,
    start: new Date(event.start),
  }));

  return (
    <div className={styles.calendar}>
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[dayGridPlugin, timeGridPlugin, adaptivePlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={false}
        selectable={true}
        selectMirror={true}
        events={events}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
        }}
      />
    </div>
  );
}
