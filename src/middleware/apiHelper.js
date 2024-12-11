// import { auth } from './firebase';

// export const makeApiCall = async (url, method = 'GET', body = null) => {
//   const token = await auth.currentUser.getIdToken();
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
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

import { auth } from './firebase';

// Retrieve or generate a persistent correlation ID
let correlationId = localStorage.getItem('correlationId');
if (!correlationId) {
  // Generate a UUID for correlation. For older browsers, you could use a library like 'uuid'.
  correlationId = crypto.randomUUID();
  localStorage.setItem('correlationId', correlationId);
}

export const makeApiCall = async (url, method = 'GET', body = null) => {
  const token = await auth.currentUser.getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Correlation-ID': correlationId,  // Add correlation ID header
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
