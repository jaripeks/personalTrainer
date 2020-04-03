import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import Paper from '@material-ui/core/Paper'

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

const Calendar = ({ trainings }) => {
    const getEvents = () => {
        const events = trainings.map(training => {
            return({
                title: `${training.customer.firstname} ${training.customer.lastname} / ${training.activity}`,
                start: new Date(training.date),
                end: getEndTime(new Date(training.date), training.duration)
            })
        })
        return events
    }

    const getEndTime = (date, minutes) => {
        const endTime = new Date(date.getTime() + minutes * 60000)
        console.log(endTime)
    }

    return (
        <Paper>
            <FullCalendar 
                defaultView='dayGridMonth'
                header={{
                    left:'prev, next today',
                    center: 'title',
                    right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                weekends='true'
                events={getEvents()}
            />
        </Paper>
    )
}

export default Calendar