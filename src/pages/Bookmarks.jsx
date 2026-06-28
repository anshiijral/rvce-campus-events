import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { loadEvents } from "../utils/loadEvents";
import { getEventId } from "../utils/eventHelpers";

function Bookmarks() {
  const [events, setEvents] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);

    loadEvents()
      .then((allEvents) => {
        const bookmarkedEvents = allEvents.filter((event, index) =>
          saved.includes(getEventId(event, index))
        );
        setEvents(bookmarkedEvents);
      })
      .finally(() => setLoading(false));
  }, []);

  function toggleBookmark(id) {
    const updated = bookmarks.filter((item) => item !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setEvents((prev) => prev.filter((event, index) => getEventId(event, index) !== id));
  }

  if (loading) {
    return <div className="p-8 text-center">Loading bookmarks...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="text-sm font-semibold text-blue-700 hover:underline">
          ← Back to events
        </Link>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">Bookmarked Events</h1>
        <p className="mt-2 text-slate-600">Your saved campus events.</p>

        {events.length === 0 ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center text-slate-600">
            No bookmarked events yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => {
              const id = getEventId(event, index);

              return (
                <EventCard
                  key={id}
                  event={event}
                  index={index}
                  isBookmarked={true}
                  onToggleBookmark={toggleBookmark}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Bookmarks;