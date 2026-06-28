import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { loadEvents } from "../utils/loadEvents";
import { getEventId, searchableText } from "../utils/eventHelpers";

function EventFeed() {
  const [events, setEvents] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);

    loadEvents()
      .then(setEvents)
      .catch(() => setError("Could not load events. Please check the data source."))
      .finally(() => setLoading(false));
  }, []);

  function toggleBookmark(id) {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      searchableText(event).includes(search.toLowerCase())
    );
  }, [events, search]);

  if (loading) {
    return <div className="p-8 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">IEEE Student Branch RVCE</p>
            <h1 className="text-4xl font-bold text-slate-900">RVCE Campus Events</h1>
            <p className="mt-2 text-slate-600">
              Browse, search, and bookmark campus events.
            </p>
          </div>

          <Link
            to="/bookmarks"
            className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
          >
            Bookmarks ({bookmarks.length})
          </Link>
        </header>

        <input
          type="text"
          placeholder="Search events by title, venue, organizer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(30);
          }}
          className="mb-6 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="mb-4 text-sm text-slate-600">
          Showing {Math.min(visibleCount, filteredEvents.length)} of {filteredEvents.length} events
        </p>

        {filteredEvents.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-slate-600">
            No events found.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.slice(0, visibleCount).map((event, index) => {
              const id = getEventId(event, index);

              return (
                <EventCard
                  key={id}
                  event={event}
                  index={index}
                  isBookmarked={bookmarks.includes(id)}
                  onToggleBookmark={toggleBookmark}
                />
              );
            })}
          </div>
        )}

        {visibleCount < filteredEvents.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount(visibleCount + 30)}
              className="rounded-xl bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-700"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default EventFeed;
