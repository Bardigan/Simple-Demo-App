const FIREBASE_DOMAIN = 'https://fir-react-7467d-default-rtdb.firebaseio.com';

export async function getAllQuotes(data,token) {
  if (token !== '') {const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json?auth=${token}`);
  const data = await response.json();
  

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }
  // reverse so the new ones on top
  return transformedQuotes.reverse();}
}

export async function getSingleQuote(quoteId,token) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json?auth=${token}`, {
    method: 'GET',
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not delete the quote.');
  }

  return data;
}

export async function deteleQuote(quoteId,token) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json?auth=${token}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not delete the quote.');
  }

  return null;
}


export async function addQuote(quoteData,token) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json?auth=${token}`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function changePassword(changePassData) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSQUjZSlSh5mAa0Cwjl7BpyHhwxOchnDI`, {
    method: 'POST',
    body: JSON.stringify(changePassData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
}