import React, { useEffect, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
// import { GoogleApiWrapper } from "google-maps-react";

import { FaMapMarkerAlt } from "react-icons/fa";

const GOOGLEAPI = "AIzaSyDi1enMDQbR9Khs0qDDu1Kve1-W8HysXmk";
export const GooglePlaces = ({
  defaultValue,
  setLocationName,
  disabled,
  //   setGoogleLoading,
}) => {
  const [address, setAddress] = useState(defaultValue || "");
  const handleSelect = async (value) => {
    // setGoogleLoading && setGoogleLoading(true);

    // getPostalCode(value);
    setAddress(value);
    setLocationName && setLocationName(value);
  };

  useEffect(() => {
    if (!!defaultValue) {
      setAddress(defaultValue);
    }
  }, [defaultValue]);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="googleplaces">
          <input
            className="inputfield"
            {...getInputProps({
              placeholder: "Search Places ...",
            })}
            disabled={disabled}
          />

          <div className="googleplaces-dropdown">
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  className={`googleplaces-dropdown-items ${
                    suggestion.active && "active"
                  }`}
                  key={index}
                  {...getSuggestionItemProps(suggestion)}>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
