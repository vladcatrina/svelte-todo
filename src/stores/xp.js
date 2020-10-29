import { writable } from "svelte/store";
import { setLocalStorage } from "../helpers";

const createXp = () => {
    const {subscribe, update} = writable(0, setLocalStorage('xp'));

    return {
        subscribe,
        reward: (amount) => {
            update(currentXp => parseInt(currentXp) + parseInt(amount));
        }
    }
}

export const xp = createXp();