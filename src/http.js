export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        //if ok is false the result is a 200 or 300 ish code
        //if ok is true the result is a 400 or 500 ish code
        throw new Error('Failed to fetch places.');
    }

    return resData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
      throw new Error('Failed to fetch user places.');
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places:places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resData = await response.json();
  
  if (!response.ok) {
    throw new Error('Failed to update user data.');
  }

  return resData.message;
}