import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const GeoLocationSearch = ({ setLocation, defaultValue }) => {
  const [value, setValue] = useState(null);
  // const handlePlaceSelect = (place) => {
  //   const placeId = place.place_id;
  //   const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyBgbCJ6O5FEMfvHjrUclDXxIO3Tm7QYqiQ`;

  //   fetch(geocodeUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "OK") {
  //         const result = data.results[0];
  //         const address = result.formatted_address.split(", ");
  //         const selectedLocation = { city: address[0], state: address[1], country: address[2] };
  //         setLocation({ ...selectedLocation });
  //       } else {
  //         console.log("Geocoding failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    // Update location when value changes
    if (value) {
      const address = value.label.split(", ");
      const country = address.pop();
      const city = address.splice(-2, 1)[0];
      const state = address.splice(-1, 1)[0];
      const selectedLocation = {
        city,
        state,
        country,
        label: value.label
      };
      setLocation({ ...selectedLocation });
    }
  }, [value, setLocation]);
  return (
    <>
      {/* <Autocomplete
        style={{ overflow: "visible" }}
        apiKey={"AIzaSyA5-vfs-QJdbRepMOCaU8H9pQT4cNya5xc"}
        onPlaceSelected={handlePlaceSelect}
        types={["address"]}
        onChange={(e) => setState(e.target.value)}
        defaultValue={defaultValue}
      /> */}
      <GooglePlacesAutocomplete
        selectProps={{
          defaultInputValue: defaultValue || "", // set default value
          value,
          onChange: setValue
        }}
      />
    </>
  );
};

export default GeoLocationSearch;
