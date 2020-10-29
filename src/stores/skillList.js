import { writable } from "svelte/store";
import { SAMPLE_SKILL } from "../constants";
import { setLocalStorage } from "../helpers";

const createSkillList = () => {
  const { subscribe, update } = writable([], setLocalStorage("skillList"));

  return {
    subscribe,
    add: (newSkill) => {
      update((list) => [...list, { ...SAMPLE_SKILL, ...newSkill }]);
    },
    reward: (skill, amount) => {
      update((list) => {
        let newList = [...list];
        newList[skill].level =
          parseInt(newList[skill].level) + parseInt(amount);
        return newList;
      });
    },
  };
};

export const skillList = createSkillList();
