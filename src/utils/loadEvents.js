export async function loadEvents() {
  const dataSource = import.meta.env.VITE_DATA_SOURCE || "./events.json";

  const source = dataSource.startsWith("https")
    ? dataSource
    : `/${dataSource.replace("./", "")}`;

  const response = await fetch(source);

  if (!response.ok) {
    throw new Error("Unable to load events");
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.events)) {
    return data.events;
  }

  return [];
}