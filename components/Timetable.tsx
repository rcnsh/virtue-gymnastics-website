import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import adaptivePlugin from '@fullcalendar/adaptive';
import styles from '@/styles/Timetable.module.css';

export default function Timetable() {
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
        events={[{ title: 'nice event', start: new Date() }]}
      />
    </div>
  );
}
