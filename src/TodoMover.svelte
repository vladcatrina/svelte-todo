<script>
  export let text;
  export let diff;
  export let index;
  export let filter;
  export let focusNewPos;
  import { loc } from "./stores/loc";
  import { todoList } from "./stores/todoList";

  const handleMove = (event) => {
    try {
      event.target.blur();
      const newIndex = todoList.switchPlaces(index, diff, filter);
      focusNewPos(newIndex);
    } catch (e) {
      alert($loc[e]);
    }
  };
</script>

<button on:click|stopPropagation={handleMove}>{text}</button>
