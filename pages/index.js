import { useState, useEffect } from "react";
import Map from "../components/Map";
import Loader from "../components/Loader";
import Header from "../components/Header";

function MyApp() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //fetchEvents is an asynchronous function using async/await that fetches the events at the nasa api (all of the fire coordinates and any other similar data)
    const fetchEvents = async () => {
      //set loading to true while data is being fetched
      setLoading(true);

      const res = await fetch(
        "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
      );
      const { events } = await res.json();

      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Header />

      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default MyApp;
