import { auth } from './firebase';

export const makeApiCall = async (url, method = 'GET', body = null) => {
  const token = await auth.currentUser.getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

// import { auth } from './firebase';

// // Generate a Correlation ID if it doesn't exist
// const generateCorrelationId = () => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0;
//     const v = c === 'x' ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// // Retrieve or create a Correlation ID
// const getCorrelationId = () => {
//   let correlationId = localStorage.getItem('X-Correlation-ID');
//   if (!correlationId) {
//     correlationId = generateCorrelationId();
//     localStorage.setItem('X-Correlation-ID', correlationId);
//   }
//   return correlationId;
// };

// // Enhanced API call function
// export const makeApiCall = async (url, method = 'GET', body = null) => {
//   const token = await auth.currentUser.getIdToken();
//   const correlationId = getCorrelationId();

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//     'X-Correlation-ID': correlationId, // Include the Correlation ID
//   };

//   const response = await fetch(url, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : null,
//   });

//   if (!response.ok) {
//     throw new Error(`API call failed: ${response.statusText}`);
//   }

//   return response.json();
// };
