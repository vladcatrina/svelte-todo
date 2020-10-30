<script>
  import { notifications } from "./stores/notifications";
  import { language } from "./stores/language";
  import { loc } from "./stores/loc";
  import { expressTime, parseDate } from "./helpers";
</script>

<div>
  <ul>
    {#if $notifications.length === 0}
    <li>{$loc["noNotifications"]}</li>
    {/if}
    {#each $notifications as notif}
      <li>
        <b>{`${notif.timeLeft !== 0 ? expressTime(notif.timeLeft)[$language] : ''} ${$loc[notif.message]} ${notif.todoContent}`}
        </b>
        &nbsp;
        <div>
          <i>
            {notif.date ? parseDate(notif.date) : ""}
          </i>
        </div>
      </li>
    {/each}
  </ul>
  {#if $notifications.length > 0}
    <a on:click={notifications.clear}>Clear</a>
  {/if}
</div>
