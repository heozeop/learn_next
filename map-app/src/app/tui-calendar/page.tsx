"use client"

import Calendar from "@toast-ui/react-calendar";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export default function TUICalendar() {
  const calendars = [{ id: 'cal1', name: 'Personal' }];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2023-08-25T15:00:00',
      end: '2023-08-28T15:30:00',
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'Coffee Break',
      category: 'time',
      start: '2023-08-23T15:00:00',
      end: '2023-08-25T15:30:00',
    },
  ];

  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  return (
    <div>
      <Calendar
    height="900px"
    calendars={[
      {
        id: '0',
        name: 'Private',
        bgColor: '#9e5fff',
        borderColor: '#9e5fff'
      },
      {
        id: '1',
        name: 'Company',
        bgColor: '#00a9ff',
        borderColor: '#00a9ff'
      }
    ]}
    disableDblClick={true}
    disableClick={false}
    isReadOnly={false}
    month={{
      startDayOfWeek: 0
    }}
    
    scheduleView
    taskView
    template={{
      milestone(schedule) {
        return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
          schedule.title
        }</span>`;
      },
      milestoneTitle() {
        return 'Milestone';
      },
      allday(schedule) {
        return `${schedule.title}<i class="fa fa-refresh"></i>`;
      },
      alldayTitle() {
        return 'All Day';
      }
    }}
    timezones={[
      {
        timezoneOffset: 540,
        displayLabel: 'GMT+09:00',
        tooltip: 'Seoul'
      },
      {
        timezoneOffset: -420,
        displayLabel: 'GMT-08:00',
        tooltip: 'Los Angeles'
      }
    ]}
    useDetailPopup
    useCreationPopup
    week={{
      showTimezoneCollapseButton: true,
      timezonesCollapsed: true
    }}
      />
    </div>
  );
}