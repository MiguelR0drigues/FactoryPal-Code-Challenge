import { MOCKED_DATA } from "../mocked-data";
import { APIData } from "../types";

export const fetchData = (): Promise<APIData> => {
  return Promise.resolve(MOCKED_DATA);
};
export default fetchData;
