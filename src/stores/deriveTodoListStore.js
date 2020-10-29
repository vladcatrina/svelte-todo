import { derived } from "svelte/store";
import { todoList } from "./todoList";

export const deriveTodoListStore = (filter) => {
  return derived(todoList, ($todoList) => {
    let newArr = [...$todoList];

    for (let i = newArr.length - 1; i >= 0; i--) {
      newArr[i].sourceIndex = i;
      if (!filter(newArr[i])) {
        newArr.splice(i, 1);
      }
    }
    return newArr;
  });
};
