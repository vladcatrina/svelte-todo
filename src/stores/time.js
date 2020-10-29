import { readable, get } from "svelte/store";
import { todoList } from "./todoList";
import { notifications } from "./notifications";
import { TIME_TICK } from "../constants";

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    console.log('trying');

    const $time = new Date();
    set($time);

    let $todoList = get(todoList);

    $todoList.forEach((todoItem, index) => {
      if (todoItem.timeLimit !== 0) {
        //todos with a quarter of timer left & expired todos
        let date = new Date(todoItem.date).valueOf();
        let timeLimit = parseInt(todoItem.timeLimit);
        let quarterLeftDate = date + Math.floor((timeLimit * 3) / 4);

        // let timeDiff = Math.abs($time - quarterLeftDate);
        let timeLeft = date + timeLimit - $time;

        if ($time > quarterLeftDate && !todoItem.sentExpireWarning) {
          todoList.hasSentExpiredWarning(index);
          notifications.add({
            message: "shortTime",
            timeLeft,
            todoIndex: index,
            todoContent: todoItem.content,
            date: new Date()
          });
        }

        if (timeLeft < 0 && !todoItem.expired) {
          todoList.expire(index);

          notifications.add({
            message: "expiredTime",
            timeLeft: 0,
            todoIndex: index,
            todoContent: todoItem.content,
            date: new Date()
          });
        }
      }
    });
  }, TIME_TICK);

  return function stop() {
    clearInterval(interval);
  };
});
