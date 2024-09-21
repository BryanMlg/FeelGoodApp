import React, {useContext} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {DateSelectArg, EventClickArg} from '@fullcalendar/core'
import {ContentContext} from './context'
import { showNotification } from '../../../services/alertServices'
const MyCalendar: React.FC = () => {
  const {data, toggleModal, setSelectedItem, setSelectedFecha} = useContext(ContentContext)

  // Mapea los datos al formato que FullCalendar espera
  const events = data?.map((item) => ({
    title: item.actividadFisica,
    start: item.fecha,
    extendedProps: {
      horasSueno: item.horasSueno,
      consumeAlcohol: item.consumeAlcohol,
      consumeTabaco: item.consumeTabaco,
      horasActividadFisica: item.horasActividadFisica,
      fecha: item?.fecha,
      id: item?.id,
      actividadFisica: item?.actividadFisica,
    },
  }))

  // Función para comparar solo la fecha (sin la hora)
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0] // Obtiene la fecha en formato YYYY-MM-DD
  }

  // Función para verificar si ya existe un evento en la fecha seleccionada
  const isDateAlreadyTaken = (date: Date): any => {
    const formattedDate = formatDate(date)
    return events?.some((event) => formatDate(new Date(event.start)) === formattedDate)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (isDateAlreadyTaken(selectInfo.start)) {
      showNotification(5, 'Fecha No Disponible', 'Ya existe un registro en esta fecha')
      return
    }

    setSelectedFecha(selectInfo?.start)
    toggleModal(0)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    const {extendedProps} = clickInfo.event
    setSelectedItem(extendedProps)
    toggleModal(1)
  }

  return (
    <div className='card shadow-sm'>
      <div className='card-body p-0 py-5 px-5'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          selectable={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          contentHeight='630px'
        />
      </div>
    </div>
  )
}

export default MyCalendar
