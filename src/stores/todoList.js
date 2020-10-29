import { writable, get } from "svelte/store";
import { xp } from "./xp";
import { skillList } from "./skillList";
import { SAMPLE_TODO } from "../constants";
import { swap, setLocalStorage } from "../helpers";

const createTodoList = function () {
  const { subscribe, update } = writable([], setLocalStorage("todoList"));

  return {
    subscribe,

    add: (newTodo) => {
      update((list) => [...list, { ...SAMPLE_TODO, ...newTodo }]);
    },

    remove: (index) => {
      update((list) => {
        let newList = [...list];
        newList.splice(index, 1);
        return newList;
      });
    },

    edit: (index, newItem) => {
      update((list) => {
        let newList = [...list];
        newList[index] = { ...newList[index], ...newItem };
        return newList;
      });
    },

    complete: (index) => {
      update((list) => {
        let newList = [...list];

        if (newList[index].expired) {
          throw "todoExpired";
        }
        const skills = get(skillList);

        if (
          newList[index].skillReq.skill !== -1 &&
          newList[index].skillReq.level >
            skills[newList[index].skillReq.skill].level
        ) {
          throw "skillInsufficient";
        }
        xp.reward(newList[index].xpReward);

        if (newList[index].skillReward.skill !== -1) {
          skillList.reward(
            newList[index].skillReward.skill,
            newList[index].skillReward.level
          );
        }

        newList[index] = {
          ...newList[index],
          completed: true,
        };
        return newList;
      });
    },

    uncomplete: (index) => {
      update((list) => {
        let newList = [...list];
        newList[index] = {
          ...newList[index],
          completed: false,
        };
        return newList;
      });
    },

    expire: index => {
      update((list) => {
        let newList = [...list];
        newList[index] = {
          ...newList[index],
          expired: true,
        };
        return newList;
      });
    },

    hasSentExpiredWarning: index => {
      update((list) => {
        let newList = [...list];
        newList[index] = {
          ...newList[index],
          sentExpireWarning: true,
        };
        return newList;
      });
    },

    switchPlaces: (firstIndex, diff, filter) => {
      let newIndex;

      update((list) => {
        const forLimit = diff === -1 ? -1 : list.length;
        for (let i = firstIndex + diff; i != forLimit; i += diff) {
          if (filter(list[i]) === filter(list[firstIndex])) {
            newIndex = i;
            return swap(list, firstIndex, i);
          }
        }
        throw "listLimitError";
      });

      return newIndex;
    },
  };
};

export const todoList = createTodoList();
