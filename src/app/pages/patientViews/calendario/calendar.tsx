import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

const MyCalendar: React.FC = () => {
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log('Fecha seleccionada:', selectInfo.startStr); // Accede a la fecha seleccionada
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Evento: ${clickInfo.event.title}, Fecha: ${clickInfo.event.start}`);
  };

  return (
    <div className='card shadow-sm'>
      <div className='card-body p-0 py-5 px-5'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth' // Mostrar solo los meses
          selectable={true}
          events={[
            { title: 'Evento 1', start: '2024-06-28' },
            { title: 'Evento 2', start: '2024-06-29' },
          ]}
          select={handleDateSelect}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          
          contentHeight='630px'
        />
      </div>
    </div>
  );
}

export default MyCalendar;
