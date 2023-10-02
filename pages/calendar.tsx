import { NextPage } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import adaptivePlugin from '@fullcalendar/adaptive';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '@/styles/Timetable.module.css';
import dates from '@/pages/api/dates.json';
import { useState } from 'react';
import LineBreaks from '@/components/line-breaks';
import { EventClickArg } from '@fullcalendar/core';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Calendar: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventClickArg | null>(null);

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
            setModalIsOpen(true);
            setEventInfo(info);
          }}
          events={events}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
          }}
          weekNumberCalculation={'ISO'}
        />
        <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{eventInfo?.event?.title}</DialogTitle>
              <DialogDescription>
                {eventInfo?.event?.extendedProps?.cost}
              </DialogDescription>
            </DialogHeader>
            <Button
              type={'submit'}
              onClick={() => {
                console.log('Booked');
              }}
            >
              Book
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <LineBreaks />
    </>
  );
};

export default Calendar;
