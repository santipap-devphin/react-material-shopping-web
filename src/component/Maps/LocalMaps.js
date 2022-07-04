import React from 'react';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { PropTypes as propchange } from "prop-types";

const LocalMaps = (props) => {

    //console.log(props)

    const mapStyles = {
        width: "100%",
       
      };

  return (
    <Map
            google={props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: props.latitude, lng: props.longitude }}
        >
            <Marker
            position={{ lat: props.latitude, lng: props.longitude }}
            icon={{
                url: `${process.env.PUBLIC_URL + "../../assets/img/2.png"}`
            }}
            animation={props.google.maps.Animation.BOUNCE}
        />
    </Map>
  )
}
LocalMaps.propchange = {
    google: propchange.object,
    latitude: propchange.string,
    longitude: propchange.string
  };

  export default GoogleApiWrapper({
    apiKey: "AIzaSyB2D8wrWMY3XZnuHO6C31uq90JiuaFzGws"
  })(LocalMaps);