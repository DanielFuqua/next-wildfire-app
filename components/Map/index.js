import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../LocationMarker";
import LocationInfoBox from "../LocationInfoBox";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  //This variable "markers" will be an array of LocationMarker components. The markers will go in the GoogleMapReact component that is returned here. (the map)
  const markers = eventData.map((ev) => {
    //Check to see if the event data is of the wildfire category and then create a location marker component with each event's coordinates
    if (ev.categories[0].id === 8) {
      return (
        <LocationMarker
          lat={ev.geometries[0].coordinates[1]}
          lng={ev.geometries[0].coordinates[0]}
          onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
        />
      );
    }
    return null;
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

Map.defaultProps = {
  //using some place in California or Oregon?
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
