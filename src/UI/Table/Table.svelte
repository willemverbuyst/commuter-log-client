<script>
  import { createEventDispatcher } from 'svelte';
  import { formatDuration } from '../../helpers/formatting';
  import { getDay, getYear } from '../../helpers/dateLogic';
  import TableButton from '../Buttons/TableButton.svelte';
  import TableHeader from './TableHeader.svelte';
  import {
    MeansOfTransportDisplay,
    StatusOfDay,
    StatusOfDayDisplay,
  } from '../../constants';

  export let logData;

  $: doUpdate(logData);

  const dispatch = createEventDispatcher();

  let filteredLogData = logData;

  function doUpdate(data) {
    filteredLogData = data;
  }
</script>

<div class="dashboard__container margin-bottom">
  <div class="table__container">
    <table>
      <TableHeader {doUpdate} {filteredLogData} {logData} />
      {#each filteredLogData as logDate}
        <tr>
          <td>{getYear(new Date(logDate.date))}</td>
          <td>{logDate.weekNumber}</td>
          <td class="table__container--align-right"
            >{getDay(new Date(logDate.date))}</td
          >
          {#if logDate.statusOfDay === StatusOfDay.DAY_OFF || logDate.statusOfDay === StatusOfDay.WORKING_FROM_HOME}
            <td colspan="5" class="table__container--day-off"
              >{StatusOfDayDisplay[logDate.statusOfDay]}</td
            >
          {:else}
            <td>{StatusOfDayDisplay[logDate.statusOfDay]}</td>
            <td>{MeansOfTransportDisplay[logDate.meansOfTransport]}</td>
            <td>{logDate.startingPoint}</td>
            <td>{logDate.destination}</td>
            <td class="table__container--align-right"
              >{formatDuration(logDate.durationTrip)}</td
            >
          {/if}
          <TableButton on:click={() => dispatch('edit', logDate.id)}
            >Edit</TableButton
          >
        </tr>
      {/each}
    </table>
  </div>
</div>

<style>
  .table__container {
    width: 1150px;
    font-family: 'Helvetica Neue';
    font-size: 12px;
    line-height: 1.2;
    color: var(--main-txt-color);
  }

  table {
    margin: auto;
    border-spacing: collapse;
  }

  td {
    padding: 0.8rem 2rem;
    text-align: left;
    border: 2px solid var(--main-bg-color);
    box-shadow: inset 0.5px 0.5px 0.5px var(--main-bg-color-light),
      inset -0.5px -0.5px 0.5px var(--main-bg-color-dark);
  }

  .table__container--align-right {
    text-align: right;
  }

  .margin-bottom {
    margin-bottom: 2rem;
  }
</style>
