import { writable } from "svelte/store";
import { setLocalStorage } from "../helpers";

const createLanguage = () => {
  const { subscribe, update } = writable("en", setLocalStorage("language"));

  return {
    subscribe,
    toggle: () => {
      update((language) => {
        if (language === "ro") {
          return "en";
        }
        return "ro";
      });
    },
  };
};

export const language = createLanguage();
