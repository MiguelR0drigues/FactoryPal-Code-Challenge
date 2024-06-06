import { MOCKED_DATA } from "../../mocked-data";
import fetchData from "../data";

describe("fetchData", () => {
  it("should fetch data correctly", async () => {
    const data = await fetchData();
    expect(data).toEqual(MOCKED_DATA);
  });
});
