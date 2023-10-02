import { NextPage } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import adaptivePlugin from '@fullcalendar/adaptive';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '@/styles/Timetable.module.css';
import dates from '@/pages/api/dates.json';
import Modal from 'react-modal';
import { useState } from 'react';

const Calendar: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = dates.map((event) => ({
    title: event.title,
    startTime: event.startTime,
    endTime: event.endTime,
    cost: event.cost,
    daysOfWeek: event.daysOfWeek.map((day) => day + 1),
  }));

  return (
    <>
      <div className={styles.calendar}>
        <FullCalendar
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            adaptivePlugin,
            interactionPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek',
          }}
          initialView="timeGridWeek"
          nowIndicator={false}
          editable={false}
          selectable={true}
          selectMirror={true}
          eventClick={(info) => {
            console.log(info.event.title);
            console.log(info.event.extendedProps.cost);
            console.log(info.event.start);
            console.log(info.event.end);
          }}
          events={events}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
          }}
          weekNumberCalculation={'ISO'}
        />
      </div>
    </>
  );
};

export default Calendar;
