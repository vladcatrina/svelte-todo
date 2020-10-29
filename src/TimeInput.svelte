<script>
  import Calendar from "./Calendar.svelte";

  export let value; //timeLimit
  export let startDate;
  let dateValue = new Date(new Date(startDate).valueOf() + value);
  let calendarOpen = false;
  let calendarValue = new Date(dateValue);

  function openCalendar() {
    calendarOpen = true;
    document.addEventListener("click", closeCalendar);
  }

  function closeCalendar() {
    calendarOpen = false;
    document.removeEventListener("click", closeCalendar, true);
  }

  let hours = dateValue.getHours();
  let minutes = dateValue.getMinutes();

  if (parseInt(hours) < 10) {
    hours = `0${hours}`;
  }
  if (parseInt(minutes) < 10) {
    minutes = `0${minutes}`;
  }
  $: {
    dateValue = new Date(calendarValue);
    dateValue.setHours(hours);
    dateValue.setMinutes(minutes);

    value = dateValue - startDate;
  }
</script>

<style>
  .time-input-container {
    position: relative;
  }

  .open {
    display: block;
    position: absolute;
    top: 40px;
    margin: auto;
    z-index: 2;
    background-color: #efefef;
  }

  .closed {
    display: none;
  }

  input {
    width: 32px;
  }

  .hour-inputs {
    display: inline-block;
  }
</style>

<span class={`time-input-container`}>
  {new Intl.DateTimeFormat('en-US').format(calendarValue)}

  <div class="hour-inputs">
    <button id="calendar-button"
      on:click|stopPropagation|preventDefault={calendarOpen ? closeCalendar : openCalendar}>Calendar</button>
    <div
      on:click|stopPropagation
      class={`calendar-box ${calendarOpen ? 'open' : 'closed'}`}>
      <Calendar bind:value={calendarValue} {closeCalendar} />
    </div>
    <input bind:value={hours} maxlength="2" />
    :
    <input bind:value={minutes} maxlength="2" />
  </div>
</span>
