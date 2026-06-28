import { Link } from "react-router-dom";
import {
  getDate,
  getEventId,
  getOrganizer,
  getTitle,
  getVenue,
} from "../utils/eventHelpers";

function EventCard({ event, index, isBookmarked, onToggleBookmark }) {
  const id = getEventId(event, index);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-sm text-blue-600 font-medium">{getDate(event)}</p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {getTitle(event)}
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            {getOrganizer(event)}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {getVenue(event)}
          </p>
        </div>

        <button
          onClick={() => onToggleBookmark(id)}
          className="h-10 rounded-full border px-3 text-sm hover:bg-slate-100"
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      </div>

      <Link
        to={`/event/${id}`}
        className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
      >
        View details
      </Link>
    </div>
  );
}

export default EventCard;