import { Fragment } from "react";
import { getFilteredEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function FileredEventsPage(props) {
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for a date`} />
    </Head>
  );

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filters. Please Adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const { filteredEvents, date } = props;
  const filteredDate = new Date(date.year, date.month - 1);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found! :(</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${date.month}/${date.year}`}
      />
    </Head>
  );

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={filteredDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FileredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const filteredData = params.slug;

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2019 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
