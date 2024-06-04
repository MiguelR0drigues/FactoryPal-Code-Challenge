import { MOCKED_DATA } from "../mocked-data";
import { APIData } from "../types";

export const fetchData = (): Promise<APIData> => {
  console.log("API / fetchData");
  return Promise.resolve(MOCKED_DATA);
};
export default fetchData;
