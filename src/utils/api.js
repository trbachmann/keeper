export const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }
  return await response;
}

export const createOptions = (method, data) => ({
  method,
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
});