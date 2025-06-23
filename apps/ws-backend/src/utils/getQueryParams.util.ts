import { PORT } from "./config.util";

const getQueryParams = (query: string, requestUrl: string): string | null => {
  const url = new URL(requestUrl, `ws://localhost:${PORT}`);
  const queryValue = url.searchParams.get(query);
  return queryValue;
};

export default getQueryParams;
