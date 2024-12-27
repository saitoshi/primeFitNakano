/**
 * @name getToken
 * @desc Retrieves the token from the session storage or local storage
 * @return
 */
export function getToken() {
  return (
    window.localStorage.getItem('token') ||
    window.sessionStorage.getItem('token')
  );
}
/**
 * @name setToken
 * @desc Set the token to the local storage
 */
export function setToken(token: string) {
  window.localStorage.setItem('token', token);
  window.sessionStorage.setItem('token', token);
}
/**
 * @name removeToken
 * @desc Removes the token from the session stroage or local storage
 * @return n/a
 */
export function removeToken() {
  window.localStorage.removeItem('token');
  window.sessionStorage.removeItem('token');
}

/**
 * @name verifyToken
 * @desc Verifies the token from the localstorage to see if it is valid
 * @return true or false
 */
export async function verifyToken() {
  const token = await getToken();
  const verifyResponse = await fetch(`${process.env.URL}api/verify`, {
    headers: { Authorization: `Bearer: ${token}` },
    method: 'GET',
  });
  const verification = await verifyResponse.json();
  if (verification['status'] === 201) {
    return true;
  } else {
    return false;
  }
}
