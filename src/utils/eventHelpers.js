export function getEventId(event, index) {
  return String(event.id || event.event_id || event.slug || index);
}

export function getTitle(event) {
  return event.title || event.name || "Untitled Event";
}

export function getVenue(event) {
  const location = event.location || event.venue;

  if (!location) {
    return "Venue not available";
  }

  if (typeof location === "string") {
    return location;
  }

  if (typeof location === "object") {
    const building = location.building || "";
    const room = location.room_number ? `Room ${location.room_number}` : "";
    const floor = location.floor ? `Floor ${location.floor}` : "";

    const parts = [building, room, floor].filter(Boolean);

    return parts.length > 0 ? parts.join(", ") : "Venue not available";
  }

  return "Venue not available";
}

export function getOrganizer(event) {
  return (
    event.organizer ||
    event.club ||
    event.host ||
    event.host_club ||
    "Organizer not available"
  );
}

export function getDescription(event) {
  return event.description || event.details || "No description available.";
}

export function getDate(event) {
  const rawDate =
    event.date ||
    event.start_date ||
    event.datetime ||
    event.start_time ||
    event.time;

  if (!rawDate) {
    return "Date not available";
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function searchableText(event) {
  return [
    getTitle(event),
    getVenue(event),
    getOrganizer(event),
    getDescription(event),
  ]
    .join(" ")
    .toLowerCase();
}