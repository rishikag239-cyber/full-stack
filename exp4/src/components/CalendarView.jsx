import { memo, useCallback, useMemo, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { movePost } from "../features/posts/postsSlice";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

function CalendarView({
  onSelectPost,
  onAddPost,
  onOptimize,
}) {
  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts.posts
  );

  const [calendarDate, setCalendarDate] = useState(
    new Date(2026, 8, 1)
  );

  const [view, setView] = useState("month");

  const events = useMemo(() => {
    return posts.map((post) => ({
      id: post.id,
      title: `${post.platform}: ${post.title}`,
      start: new Date(post.start),
      end: new Date(post.end),
    }));
  }, [posts]);

  const handleSelectEvent = useCallback(
    (event) => {
      const post = posts.find(
        (item) => item.id === event.id
      );

      if (post) {
        onSelectPost(post);
      }
    },
    [posts, onSelectPost]
  );

  const handleEventDrop = useCallback(
    ({ event, start, end }) => {
      dispatch(
        movePost({
          id: event.id,
          start: new Date(start),
          end: new Date(end),
        })
      );
    },
    [dispatch]
  );

  const handleEventResize = useCallback(
    ({ event, start, end }) => {
      dispatch(
        movePost({
          id: event.id,
          start: new Date(start),
          end: new Date(end),
        })
      );
    },
    [dispatch]
  );

  const handleToday = useCallback(() => {
    setCalendarDate(new Date());
  }, []);

  const handleBack = useCallback(() => {
    const date = new Date(calendarDate);

    if (view === "month") {
      date.setMonth(date.getMonth() - 1);
    } else if (view === "week") {
      date.setDate(date.getDate() - 7);
    } else {
      date.setDate(date.getDate() - 1);
    }

    setCalendarDate(date);
  }, [calendarDate, view]);

  const handleNext = useCallback(() => {
    const date = new Date(calendarDate);

    if (view === "month") {
      date.setMonth(date.getMonth() + 1);
    } else if (view === "week") {
      date.setDate(date.getDate() + 7);
    } else {
      date.setDate(date.getDate() + 1);
    }

    setCalendarDate(date);
  }, [calendarDate, view]);

  const calendarTitle = useMemo(() => {
    if (view === "day") {
      return format(
        calendarDate,
        "EEEE, MMMM d, yyyy"
      );
    }

    if (view === "week") {
      return `Week of ${format(
        calendarDate,
        "MMM d, yyyy"
      )}`;
    }

    return format(
      calendarDate,
      "MMMM yyyy"
    );
  }, [calendarDate, view]);

  return (
    <div className="calendar-container">

      <div className="custom-calendar-toolbar">

        <div className="navigation-buttons">

          <button
            className="calendar-nav-button today-button"
            onClick={handleToday}
          >
            Today
          </button>

          <button
            className="calendar-nav-button"
            onClick={handleBack}
          >
            ‹
          </button>

          <button
            className="calendar-nav-button"
            onClick={handleNext}
          >
            ›
          </button>

        </div>

        <div className="calendar-toolbar-title">
          {calendarTitle}
        </div>

        <div className="calendar-actions">

          <button
            className={`view-button ${
              view === "month" ? "active" : ""
            }`}
            onClick={() => setView("month")}
          >
            Month
          </button>

          <button
            className={`view-button ${
              view === "week" ? "active" : ""
            }`}
            onClick={() => setView("week")}
          >
            Week
          </button>

          <button
            className={`view-button ${
              view === "day" ? "active" : ""
            }`}
            onClick={() => setView("day")}
          >
            Day
          </button>

          <button
            className="new-post-button"
            onClick={onAddPost}
          >
            + New post
          </button>

          <button
            className="optimize-button"
            onClick={onOptimize}
          >
            ◉ Optimize calendar
          </button>

        </div>
      </div>

      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={calendarDate}
        view={view}
        views={[
          "month",
          "week",
          "day",
        ]}
        onNavigate={setCalendarDate}
        onView={setView}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        popup
        toolbar={false}
        style={{ height: 650 }}
      />

    </div>
  );
}

export default memo(CalendarView);