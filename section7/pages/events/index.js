import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import Head from "next/head";

function EventsPage(props) {
  const { events } = props;
  const router = useRouter();

  function searchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find great events on the thec community!"
        />
      </Head>
      <EventsSearch onSearch={searchHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 10,
  };
}
