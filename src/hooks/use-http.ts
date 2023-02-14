import { useCallback } from "react";
import { Show } from "../models/Show";

const useHttp = () => {

  const sendRequest = useCallback(
    async (query: string): Promise<Show[]> => {
      try {
        const response = await fetch(
          `https://search.imdbot.workers.dev/?q=${query}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();

        return data.description.map((show: any) => {
          return {
            id: show["#IMDB_ID"],
            title: show["#TITLE"],
            year: show["#YEAR"]
          };
        });
      } catch (err: any) {
        console.error(err.message || "Something went wrong!");
        return [];
      }
    },
    []
  );

  return { sendRequest };
};

export default useHttp;
