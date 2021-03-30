const API_URL =
  "https://reactjs-course-97d43-default-rtdb.firebaseio.com/events.json";

export async function getAllEvents() {
  const response = await fetch(API_URL);
  const data = await response.json();

  const events = [];

  for (const eventId in data) {
    events.push({
      ...data[eventId],
      id: eventId,
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const events = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}
