import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadEvents } from "../utils/loadEvents";
import {
  getDate,
  getDescription,
  getEventId,
  getOrganizer,
  getTitle,
  getVenue,
} from "../utils/eventHelpers";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem("bookmarks") || "[]"));

    loadEvents()
      .then((events) => {
        const found = events.find((item, index) => getEventId(item, index) === id);
        setEvent(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  function toggleBookmark() {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((item) => item !== id)
      : [...bookmarks, id];

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }

  if (loading) {
    return <div className="p-8 text-center">Loading event...</div>;
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-center">
        <p className="text-lg text-slate-700">Event not found.</p>
        <Link to="/" className="mt-4 inline-block text-blue-700 font-semibold">
          Back to events
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <Link to="/" className="text-sm font-semibold text-blue-700 hover:underline">
          ← Back to events
        </Link>

        <p className="mt-6 text-sm font-semibold text-blue-600">{getDate(event)}</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">{getTitle(event)}</h1>

        <div className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-5">
          <p>
            <span className="font-semibold">Organizer:</span> {getOrganizer(event)}
          </p>
          <p>
            <span className="font-semibold">Venue:</span> {getVenue(event)}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">About this event</h2>
          <p className="mt-3 leading-7 text-slate-700">{getDescription(event)}</p>
        </section>

        <button
          onClick={toggleBookmark}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
        >
          {bookmarks.includes(id) ? "Remove Bookmark" : "Bookmark Event"}
        </button>
      </div>
    </main>
  );
}

export default EventDetail;