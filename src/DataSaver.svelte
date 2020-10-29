<script>
  import { skillList } from "./stores/skillList";
  import { todoList } from "./stores/todoList";
  import { notifications } from "./stores/notifications";
  import { language } from "./stores/language";
  import { display } from "./stores/display";
  import { xp } from "./stores/xp";

  const savedStores = { todoList, skillList, notifications, language, display, xp };

  for (let store in savedStores) {
    savedStores[store].subscribe((listJson) => {
      window.localStorage.setItem(store, JSON.stringify(listJson));
    });
  }
</script>
