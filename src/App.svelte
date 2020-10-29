<script>
  import SkillModal from "./SkillModal.svelte";
  import { onMount } from "svelte";
  import { language } from "./stores/language";
  import { display } from "./stores/display";
  import { notifications } from "./stores/notifications";
  import TodoList from "./TodoList.svelte";
  import DataSaver from "./DataSaver.svelte";
  import Notifications from "./Notifications.svelte";
  import SearchForm from "./SearchForm.svelte";
  import DayNightToggle from "./DayNightToggle.svelte";
  import XpBar from "./XpBar.svelte";
  import { loc } from "./stores/loc";

  onMount(() => {
    document.title = "RPG Todo";
  });

  function createFilterForTodoList(d, index) {
    let filter;
    let filterComplete = (item) => d.viewCompleted || !item.completed;
    let filterSearch = (item) => item.content.includes(d.searchString);

    if (d.separateDisplay) {
      if (d.questsFirst) {
        filter = (item) => filterComplete(item) && item.type === index;
      } else {
        filter = (item) => filterComplete(item) && item.type !== index;
      }
    } else {
      filter = (item) => filterComplete(item);
    }

    return (item) => filter(item) && filterSearch(item);
  }
</script>

<style>
  .container {
    position: relative;
    width: 50%;
    margin: auto;
  }
</style>

<div id="app" class={`${$display.nightMode ? 'night' : 'day'}`}>
  <DataSaver />
  <div class="container">
    <SearchForm />

    <div class="menu">
      <div class="dropdown">
        <button> 📧 Notifications {#if $notifications.length > 0}<b>!</b>{/if} </button>
        <div class="notifications dropdown-content">
          <Notifications />
        </div>
      </div>

      <div class="dropdown">
        <button>🔧 Options</button>
        <div class="dropdown-content">
          {#if $display.separateDisplay}
            <a on:click={display.setMixedDisplay}>{$loc['viewMixed']}</a>
          {:else}
            <a on:click={display.setSeparateDisplay}>{$loc['viewSeparate']}</a>
          {/if}
          <a on:click={display.toggleViewCompleted}>
            {$display.viewCompleted ? $loc['hideCompleted'] : $loc['viewCompleted']}
          </a>

          <a on:click={language.toggle}>
            {$language === 'ro' ? 'English' : 'română'}
          </a>
        </div>
      </div>

      <button on:click={display.toggleModal}>🎸 {$loc['skills']}</button>

      <DayNightToggle
        nightMode={$display.nightMode}
        toggleNightMode={display.toggleNightMode} />
    </div>

    <XpBar />

    {#if !$display.separateDisplay}
      <TodoList
        todoListIndex={0}
        filter={createFilterForTodoList($display, 0)} />
    {:else}
      <TodoList
        todoListIndex={0}
        filter={createFilterForTodoList($display, 0)} />
      <TodoList
        todoListIndex={1}
        filter={createFilterForTodoList($display, 1)} />
    {/if}
    <SkillModal
      open={$display.modalOpen}
      toggleSkillModal={display.toggleModal} />
  </div>
</div>
