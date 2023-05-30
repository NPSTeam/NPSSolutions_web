import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import clsx from 'clsx';
import { Box } from '@mui/system';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import moment from 'moment';
import CalendarHeader from './CalendarHeader';
import EventDialog from './dialogs/event/EventDialog';
import reducer from './store';
import {
  getEvents,
  getWorkspace,
  openEditEventDialog,
  openNewEventDialog,
  selectFilteredEvents,
  setTargetWorkspace,
  updateEvent,
} from './store/eventsSlice';
import { getLabels, selectLabels } from './store/labelsSlice';
import LabelsDialog from './dialogs/labels/LabelsDialog';
import CalendarAppSidebar from './CalendarAppSidebar';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& a': {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: 'none!important',
  },
  '&  .fc-media-screen': {
    minHeight: '100%',
    width: '100%',
  },
  '& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
    borderColor: `${theme.palette.divider}!important`,
  },
  '&  .fc-scrollgrid-section > td': {
    border: 0,
  },
  '& .fc-daygrid-day': {
    '&:last-child': {
      borderRight: 0,
    },
  },
  '& .fc-col-header-cell': {
    borderWidth: '0 1px 0 1px',
    padding: '8px 0 0 0',
    '& .fc-col-header-cell-cushion': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: 12,
      textTransform: 'uppercase',
    },
  },
  '& .fc-view ': {
    '& > .fc-scrollgrid': {
      border: 0,
    },
  },
  '& .fc-daygrid-day.fc-day-today': {
    backgroundColor: 'transparent!important',
    '& .fc-daygrid-day-number': {
      borderRadius: '100%',
      backgroundColor: `${theme.palette.secondary.main}!important`,
      color: `${theme.palette.secondary.contrastText}!important`,
    },
  },
  '& .fc-daygrid-day-top': {
    justifyContent: 'center',

    '& .fc-daygrid-day-number': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      margin: '4px 0',
      borderRadius: '50%',
      float: 'none',
      lineHeight: 1,
    },
  },
  '& .fc-h-event': {
    background: 'initial',
  },
  '& .fc-event': {
    border: 0,
    padding: '0 ',
    fontSize: 12,
    margin: '0 6px 4px 6px!important',
  },
}));

function CalendarApp(props) {
  const [currentDate, setCurrentDate] = useState();
  const dispatch = useDispatch();
  const getState = useSelector((state) => state);
  const events = useSelector(selectFilteredEvents);

  console.log('events', events);
  const calendarRef = useRef();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const theme = useTheme();
  const labels = useSelector(selectLabels);

  const targetWorkspace = useSelector(({ calendarApp }) => calendarApp.events.targetWorkspace);
  const user = useSelector(({ auth }) => auth.user);

  const modeCalendarFilter = useSelector(
    ({ calendarApp }) => calendarApp.events.modeCalendarFilter
  );

  useEffect(() => {
    dispatch(getWorkspace({ dispatch }));
  }, [dispatch]);

  useEffect(() => {
    if (modeCalendarFilter === 'userId') {
      dispatch(getEvents(user?.id, { dispatch, getState }));
      dispatch(getLabels(user?.id, { dispatch, getState }));
    } else if (modeCalendarFilter === 'workspaceId') {
      dispatch(getEvents(targetWorkspace?.workspaceId, { dispatch, getState }));
      dispatch(getLabels(targetWorkspace?.workspaceId, { dispatch, getState }));
    } else {
      dispatch(getEvents(targetWorkspace, { dispatch, getState }));
      dispatch(getLabels({ dispatch, getState }));
    }
  }, [dispatch, targetWorkspace, modeCalendarFilter]);

  useEffect(() => {
    setLeftSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    // Correct calendar dimentions after sidebar toggles
    setTimeout(() => {
      calendarRef.current?.getApi()?.updateSize();
    }, 300);
  }, [leftSidebarOpen]);

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;
    dispatch(openNewEventDialog(selectInfo));
  };

  const handleEventDrop = (eventDropInfo) => {
    const { id, title, allDay, start, end, extendedProps } = eventDropInfo.event;
    dispatch(
      updateEvent({
        id,
        title,
        allDay,
        start: moment(start).utcOffset(420).format(),
        end: moment(end).utcOffset(420).format(),

        extendedProps,
        workspaceId: targetWorkspace,
      })
    );
  };
  const handleEventClick = (clickInfo) => {
    dispatch(openEditEventDialog(clickInfo));
  };

  function renderEventContent(eventInfo) {
    const labelId = eventInfo.event.extendedProps.label;
    const label = _.find(labels, { id: labelId });

    return (
      <Box
        sx={{
          backgroundColor: label?.color,
          color: label && theme.palette.getContrastText(label?.color),
        }}
        className={clsx('flex items-center w-full rounded-4 px-8 py-2 h-22 text-white')}
      >
        <Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
        <Typography className="text-12 px-4 truncate">{eventInfo.event.title}</Typography>
      </Box>
    );
  }

  const handleDates = (rangeInfo) => {
    setCurrentDate(rangeInfo);
  };

  const handleEventAdd = (addInfo) => {};

  const handleEventChange = (changeInfo) => {};

  const handleEventRemove = (removeInfo) => {};

  function handleToggleLeftSidebar() {
    setLeftSidebarOpen(!leftSidebarOpen);
  }

  const handleChipClick = (workspace) => {
    dispatch(setTargetWorkspace(workspace.workspaceId));
  };

  return (
    <>
      {/* <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
          {listWorkspace.map((workspace) => (
            <Chip
              key={workspace.workspaceId}
              label={workspace.name}
              className="mr-8 mb-8"
              color="primary"
              onClick={() => handleChipClick(workspace)}
              variant={targetWorkspace === workspace.workspaceId ? 'default' : 'outlined'}
            />
          ))}
        </motion.div>
      </div> */}
      <>
        <Root
          header={
            <CalendarHeader
              calendarRef={calendarRef}
              currentDate={currentDate}
              onToggleLeftSidebar={handleToggleLeftSidebar}
            />
          }
          content={
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={false}
              initialView="dayGridMonth"
              editable
              selectable
              selectMirror
              dayMaxEvents
              weekends
              datesSet={handleDates}
              select={handleDateSelect}
              events={events}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange}
              eventRemove={handleEventRemove}
              eventDrop={handleEventDrop}
              initialDate={moment().format('YYYY-MM-DD')}
              ref={calendarRef}
            />
          }
          leftSidebarContent={<CalendarAppSidebar />}
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarOnClose={() => setLeftSidebarOpen(false)}
          leftSidebarWidth={240}
          scroll="content"
        />
        <EventDialog />
        <LabelsDialog />
      </>
    </>
  );
}

export default withReducer('calendarApp', reducer)(CalendarApp);
