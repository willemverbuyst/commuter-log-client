<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DatePicker from '../UI/Inputs/DatePicker.svelte';
  import FormButton from '../UI/Buttons/FormButton.svelte';
  import FormDropdown from '../UI/Inputs/FormDropdown.svelte';
  import Modal from '../UI/Modal/Modal.svelte';
  import TimeInput from '../UI/Inputs/TimeInput.svelte';
  import RadioButton from '../UI/Inputs/RadioButton.svelte';
  import { formatDuration, formatTimeInput } from '../helpers/formatting';
  import { checkDurationInput } from '../helpers/validation';
  import { getWeekNumber } from '../helpers/dateLogic';
  import { routes } from '../constants';
  import { addOneHour } from '../helpers/dateLogic';
  import { postNewLogData, updateLogData } from '../Store/logActions';
  import { logStore } from '../Store/logState';

  export let id;

  // Initial values for form
  let selectedDate = new Date();
  let statusOfDay = 'working at the office';
  let meansOfTransport = 'car';
  let routeTripFrom = routes[1];
  let routeTripTo = routes[2];
  let durationTrip = '00:00';

  const dispatch = createEventDispatcher();

  // Fill in the form on edit
  if (id) {
    const unsubscribe = logStore.subscribe((days) => {
      const selectedDay = days.find((d) => d.id === id);
      if (selectedDay) {
        selectedDate = new Date(selectedDay.date);
        statusOfDay = selectedDay.statusOfDay;
        if (selectedDay.statusOfDay === 'working at the office') {
          meansOfTransport = selectedDay.meansOfTransport;
          routeTripFrom = selectedDay.routeTripFrom;
          routeTripTo = selectedDay.routeTripTo;
          durationTrip = formatDuration(selectedDay.durationTrip);
        } else {
          durationTrip = '00:00';
        }
      }
    });
    unsubscribe();
  }

  $: durationTripValid = checkDurationInput(durationTrip);

  function cancel() {
    dispatch('cancel');
  }

  function onChange(e) {
    if (e.target.name === 'transport') {
      meansOfTransport = e.target.value;
    } else {
      statusOfDay = e.target.value;
    }
  }

  function submitForm() {
    let logDate;
    if (statusOfDay === 'day off' || statusOfDay === 'working from home') {
      logDate = {
        date: selectedDate.toString(),
        statusOfDay: statusOfDay,
        weekNumber: getWeekNumber(selectedDate)[1],
      };
    } else {
      logDate = {
        date: selectedDate.toString(),
        statusOfDay: statusOfDay,
        weekNumber: getWeekNumber(selectedDate)[1],
        meansOfTransport: meansOfTransport,
        routeTripFrom: routeTripFrom,
        routeTripTo: routeTripTo,
        durationTrip: formatTimeInput(durationTrip),
      };
    }
    if (id) {
      updateLogData(id, logDate);
    } else {
      postNewLogData(logDate);
    }
    dispatch('save');
  }

  function updateSelectedDate(date) {
    selectedDate = addOneHour(date);
  }
</script>

<Modal on:cancel>
  <h1>Add a day to log</h1>
  <form>
    <DatePicker {selectedDate} {updateSelectedDate} />
    <div class="radio-button__container">
      <RadioButton
        name="statusOfDay"
        bind:group={statusOfDay}
        value="day off"
        {onChange}
      />
      <RadioButton
        name="statusOfDay"
        bind:group={statusOfDay}
        value="working from home"
        {onChange}
      />
      <RadioButton
        name="statusOfDay"
        bind:group={statusOfDay}
        value="working at the office"
        {onChange}
      />
    </div>
    {#if statusOfDay === 'working at the office'}
      <div class="radio-button__container">
        <RadioButton
          name="transport"
          bind:group={meansOfTransport}
          value="car"
          {onChange}
        />
        <RadioButton
          name="transport"
          bind:group={meansOfTransport}
          value="public transport"
          {onChange}
        />
      </div>

      <div class="dropdown-input__container">
        <FormDropdown {routes} title="To" bind:value={routeTripFrom} />
        <FormDropdown {routes} title="From" bind:value={routeTripTo} />
        <TimeInput
          valid={durationTripValid}
          validityMessage="Please write a duration in the format hh:mm"
          bind:value={durationTrip}
        />
      </div>
    {/if}
  </form>
  <div class="button__container" slot="footer">
    <FormButton on:click={submitForm}>Save</FormButton>
    <FormButton on:click={cancel}>Cancel</FormButton>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }

  .radio-button__container {
    width: 100%;
    margin-top: 1rem;
  }

  .dropdown-input__container {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .button__container {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
