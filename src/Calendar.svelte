<script>
  export let value;
  export let closeCalendar;
  export let date = new Date();

  const MONTHS = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  let month;
  let year;

  const DAY_LENGTH = 86400000;

  function createDays(date) {
    let newArr = new Array([], [], [], [], [], []);
    let now = new Date(date);

    now.setDate(1); //first day of month
    const day = now.getDay();

    now = now - day * DAY_LENGTH;

    for (let i = 0; i < 42; i++) {
      newArr[Math.floor(i / 7)][i % 7] = new Date(now);
      now += DAY_LENGTH;
    }

    return newArr;
  }

  let dateArray;

  function updateDate(date) {
    month = date.getMonth();
    year = date.getFullYear();

    dateArray = createDays(date);
  }

  function selectDate(date) {
    value = date;
    closeCalendar();
  }

  function previousMonth() {
    date.setMonth(date.getMonth() - 1);
    updateDate(date);
  }

  function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    updateDate(date);
  }

  updateDate(date);
</script>

<style>
  .current-month {
    font-weight: bold;
  }
  td {
    text-align: center;
    cursor: pointer;
  }
</style>

<div class="calendar">
  <div class="header">
    <button on:click|preventDefault={previousMonth}>&lt;</button>
    <b>{MONTHS[month]} {year}</b>
    <button on:click|preventDefault={nextMonth}>&gt;</button>
  </div>
  <table>
    <tr>
      {#each DAYS as day}
        <th>{day}</th>
      {/each}
    </tr>
    {#each dateArray as week}
      <tr>
        {#each week as date}
          <td
            on:click={() => selectDate(date)}
            class={`${date.getMonth() === month ? 'current-month' : ''} ${date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'today' : ''}`}>
            {date.getDate()}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
