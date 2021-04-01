import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function EventPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found! :(</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      ></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventPage;

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const routes = events.map((event) => {
    return { params: { eventId: event.id } };
  });

  return {
    paths: routes,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 10,
  };
}
