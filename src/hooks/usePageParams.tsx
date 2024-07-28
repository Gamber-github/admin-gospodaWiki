/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { RouteName, GetPeyload } from "../routes/router"; // Import the type definition for GetPayload

export const usePageParams = <T extends RouteName>(_page: T) => {
  const params = useParams();

  return params as GetPeyload<T>["0"];
};
