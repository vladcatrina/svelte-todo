<script>
  import { language } from "./stores/language";
  import TodoRemover from "./TodoRemover.svelte";
  import TodoAdder from "./TodoAdder.svelte";
  import TodoMover from "./TodoMover.svelte";
  import TodoEditor from "./TodoEditor.svelte";
  import { todoList } from "./stores/todoList";
  import { time } from "./stores/time";
  import { deriveTodoListStore } from "./stores/deriveTodoListStore";
  import { calculateAge, parseDate } from "./helpers";

  export let todoListIndex;

  export let filter;

  let localStore;
  $: localStore = deriveTodoListStore(filter);

  let editingTodoIndex = -1;
  let coloredItemIndex = -1;
  let decolorTimeout;

  function handleTodoEdit(index) {
    editingTodoIndex = index;
  }

  function handleTodoEditSave(index, newItem) {
    todoList.edit(index, newItem);
    editingTodoIndex = -1;
  }

  function focusNewPos(newIndex) {
    clearTimeout(decolorTimeout);
    decolorTimeout = setTimeout(() => {
      coloredItemIndex = -1;
    }, 1000);
    coloredItemIndex = newIndex;

    editingTodoIndex = -1;
  }

  let checkedIndex = -1;
  function handleCheck(index) {
    checkedIndex = index;
    setTimeout(() => {
      try {
        todoList.complete(index);
      } catch (e) {
        alert(e);
      }
      checkedIndex = -1;
    }, 1500);
  }
</script>

<style>
  .inactive-todo {
    transition: background-color 1s;
  }

  :global(.todo-right) {
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px;
  }

  ul {
    padding-left: 0;
  }

  li {
    position: relative;
    padding: 12px;
    height: 32px;
  }

  li:first-child {
    border-top-left-radius: inherit;
  }

  li.editing {
    height: auto;
  }

  .content {
    font-weight: bold;
  }

  abbr {
    text-decoration: none;
  }

  .checked {
    transition: all 1s;
    height: 0;
    padding: 0;
    opacity: 0;
  }

  .expired {
    opacity: 0.6;
  }
</style>

<ul class="todo-list">
  {#each $localStore as item, index (item.sourceIndex)}
    <li
      class={`${item.sourceIndex === coloredItemIndex ? 'active-todo' : 'inactive-todo'} ${item.expired ? "expired" : ""} ${item.sourceIndex === checkedIndex ? 'checked' : ''} ${item.sourceIndex === editingTodoIndex ? 'editing' : ''} ${item.type === 0 ? 'quest' : 'training'}`}
      on:click={() => focusNewPos(item.sourceIndex)}>
      {#if item.sourceIndex === editingTodoIndex}
        <div on:click|stopPropagation class="todo-editor">
          <TodoEditor
            {handleTodoEditSave}
            index={item.sourceIndex}
            initialItem={item} />
        </div>
      {:else}
        <input
          on:click|stopPropagation={() => handleCheck(item.sourceIndex)}
          type="checkbox"
          checked={checkedIndex === item.sourceIndex || item.completed}
          disabled={item.completed || item.expired} />

        <span class="content">
          <b>{item.type === 0 ? '!' : '#'} </b>
          <span
            on:click|stopPropagation={() => handleTodoEdit(item.sourceIndex)}>
            {item.content}
          </span>
        </span>
        <div class="todo-right">
          <span class="todo-time">
            <abbr
              title={parseDate(item.date)}>{calculateAge(item.date, $time)[$language]}</abbr>
          </span>
          <TodoMover
            {focusNewPos}
            index={item.sourceIndex}
            {filter}
            text="↑"
            diff={-1} />
          <TodoMover
            {focusNewPos}
            index={item.sourceIndex}
            {filter}
            text="↓"
            diff={1} />
          <TodoRemover index={item.sourceIndex} />
        </div>
      {/if}
    </li>
  {/each}
  <li>
    <TodoAdder {todoListIndex} />
  </li>
</ul>
