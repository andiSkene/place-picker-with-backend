import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx'
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  //keep this fetch from running in an infinite loop with useEffect
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      //check for error with try/catch
      try {
        const places = await fetchAvailablePlaces();

        //fetch the users location
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPlaces);
          //it might seem like this line would be executed immediately
          //but this line won't be executed until the previous are done
          setIsFetching(false);
        });

      } catch (error) {
        //... put code here to handle error and prevent crash
        setError({ message: error.message || 'Could not fetch places, please try again later.' });

        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!"
      message={error.message}
    />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
