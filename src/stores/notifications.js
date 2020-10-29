import { get, writable } from "svelte/store";
import { setLocalStorage } from "../helpers";

const createNotifications = () => {
  const { subscribe, update, set } = writable([], setLocalStorage("notifications"));

  return {
    subscribe,
    clear: () => set([]),
    add: (notif) => update(list => [...list, { ...notif }])
  };
};

export const notifications = createNotifications();
