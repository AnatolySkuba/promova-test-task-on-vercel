import axios from 'axios';

import { ApiVersion, BASE_URL, QUERY_KEYS } from 'consts';

async function getRates() {
  const url = `${BASE_URL}/${ApiVersion.V1}/${QUERY_KEYS.LATEST}?access_key=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return null;
}

export default getRates;
