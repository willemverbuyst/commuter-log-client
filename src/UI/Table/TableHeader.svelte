<script>
  import TableButton from '../Buttons/TableButton.svelte';
  import TableDropdown from '../Inputs/TableDropdown.svelte';
  import {
    getUniqueWeekNumbers,
    getUniqueStatuses,
  } from '../../helpers/logDataLogic';
  import { filterData } from '../../helpers/tableLogic/filter';
  import { getUniqueYears } from '../../helpers/logDataLogic';

  export let logData;
  export let filteredLogData;
  export let doUpdate;

  console.log('logData', logData);

  let routes = [];
  logData.forEach((log) => {
    routes.push(log.startingPoint);
    routes.push(log.destination);
  });

  console.log('routes', new Set(routes));

  let filters = {
    routesFrom: ['no sorting', ...routes],
    startingPoint: 'no sorting',
    routesTo: ['no sorting', ...routes],
    destination: 'no sorting',
    sortDates: ['no sorting', 'ascending', 'descending'],
    sortDate: 'no sorting',
    sortTravelTimes: ['no sorting', 'ascending', 'descending'],
    sortTravelTime: 'no sorting',
    statuses: ['all', ...getUniqueStatuses(filteredLogData)],
    status: 'all',
    weeks: ['all', ...getUniqueWeekNumbers(filteredLogData)],
    week: 'all',
    years: ['all', ...getUniqueYears(filteredLogData)],
    year: 'all',
  };

  function resetFilters() {
    filters.startingPoint = 'no sorting';
    filters.destination = 'no sorting';
    filters.sortDate = 'no sorting';
    filters.sortTravelTime = 'no sorting';
    filters.status = 'all';
    filters.meansOfTransport = 'all';
    filters.week = 'all';
    filters.year = 'all';

    doUpdate(logData);
  }

  function updateData(event, dropdown) {
    filters[dropdown] = event.target.value;

    if (event.target.value === 'all' || event.target.value === 'no sorting') {
      doUpdate(logData);
    } else {
      filteredLogData = filterData(
        filteredLogData,
        filters[dropdown],
        dropdown
      );
      doUpdate(filteredLogData);
    }
  }
</script>

<tr>
  <th>
    <TableDropdown
      label="year"
      options={filters.years}
      value={filters.year}
      on:change={(event) => updateData(event, 'year')}
    />
  </th>
  <th>
    <TableDropdown
      label="Week#"
      options={filters.weeks.map((w) => String(w))}
      value={filters.week}
      on:change={(event) => updateData(event, 'week')}
    />
  </th>
  <th>
    <TableDropdown
      label="Date"
      options={filters.sortDates}
      value={filters.sortDate}
      on:change={(event) => updateData(event, 'sortDate')}
    />
  </th>
  <th>
    <TableDropdown
      label="Working"
      options={filters.statuses}
      value={filters.status}
      on:change={(event) => updateData(event, 'status')}
    />
  </th>
  <th>
    <TableDropdown
      label="Means of transport"
      options={filters.statuses}
      value={filters.status}
      on:change={(event) => updateData(event, 'status')}
    />
  </th>
  <th>
    <TableDropdown
      label="From"
      options={filters.startingPoint}
      value={filters.startingPoint}
      on:change={(event) => updateData(event, 'startingPoint')}
    />
  </th>
  <th>
    <TableDropdown
      label="To"
      options={filters.destination}
      value={filters.destination}
      on:change={(event) => updateData(event, 'destination')}
    />
  </th>
  <th>
    <TableDropdown
      label="Travel Time"
      options={filters.sortTravelTimes}
      value={filters.sortTravelTime}
      on:change={(event) => updateData(event, 'sortTravelTime')}
    />
  </th>
  <th>
    <div class="label">Filters</div>
    <TableButton on:click={resetFilters}>Reset</TableButton></th
  >
</tr>

<style>
  th {
    text-align: center;
  }

  .label {
    margin-bottom: 10px;
    text-transform: uppercase;
  }
</style>
