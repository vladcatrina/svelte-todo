import { get, writable } from "svelte/store";
import { SAMPLE_DISPLAY } from "../constants";
import { setLocalStorage } from "../helpers";

const createDisplay = () => {
  const { subscribe, update, set } = writable(
    SAMPLE_DISPLAY,
    setLocalStorage("display")
  );

  return {
    subscribe,
    setMixedDisplay: () => {
      update((display) => ({ ...display, separateDisplay: false }));
    },
    setSeparateDisplay: () => {
      update((display) => ({ ...display, separateDisplay: true }));
    },
    listSearchResults: (searchString) => {
      update((display) => ({ ...display, searchString }));
    },
    toggleModal: () => {
      update((display) => ({ ...display, modalOpen: !display.modalOpen }));
    },
    toggleViewCompleted: () => {
      update((display) => ({
        ...display,
        viewCompleted: !display.viewCompleted,
      }));
    },
    toggleNightMode: () => {
      update((display) => ({
        ...display,
        nightMode: !display.nightMode,
      }));
    }
  };
};

export const display = createDisplay();
