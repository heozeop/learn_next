"use client"

import type { DateSelectArg, EventContentArg, EventInput } from "fullcalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ClassAttributes, LegacyRef, useRef, useState } from "react";

export default function CalendarPage() {
  const ref = useRef<FullCalendar>();
  const [events, setEvents] = useState<EventInput[]>([]);

  const handleDateSelect = (a: DateSelectArg) => {
    const api = ref.current?.getApi();
    setEvents((events) => [...events, {
      start: a.start,
      end: a.end,
      startEditable: true,
      durationEditable: true,
      display: "background"
    }])
  }


  return <FullCalendar
    ref={ref}
    selectable
    selectMirror
    selectOverlap
    unselectAuto
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    }}

    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
    initialView="timeGridWeek"
    select={handleDateSelect}
    eventContent={renderEventContent}
    events={events}
  />
}

function renderEventContent(eventInfo: DateSelectArg) {
  console.log(eventInfo);
  return (
    <>
      <div>ㅎ헤일로우 월ㅡ</div>
      <b>{eventInfo.allDay}</b>
    </>
  )
}
