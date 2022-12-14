<script lang="ts">
  import { afterUpdate } from 'svelte';
  import 'chartjs-plugin-datalabels';
  import { formatDuration } from '../../helpers/formatting';
  import { getAllWorkingDaysData } from '../../helpers/chartLogic/allWorkingDaysChart';
  import {
    colorGrid,
    colorTitle,
    colorTravelTimeAverage,
    colorTravelTimeExtra,
    colorTravelTimeMaps,
    colorTravelTimeNormal,
  } from '../colors';
  import Chart from 'chart.js';

  export let showGrid;
  export let logData;

  let allWorkingDaysChart;
  let ctx;

  function createChart() {
    const { travelTimes, maxForDisplay, labels, title, lineValue } =
      getAllWorkingDaysData(logData);

    const canvas = document.getElementById('allWorkingDaysChart');
    ctx = (canvas as HTMLCanvasElement).getContext('2d');

    const gradientFill = ctx.createLinearGradient(0, 100, 0, 250);
    gradientFill.addColorStop(0, colorTravelTimeExtra);
    gradientFill.addColorStop(0.5, colorTravelTimeMaps);
    gradientFill.addColorStop(1, colorTravelTimeNormal);

    if (allWorkingDaysChart) allWorkingDaysChart.destroy();

    allWorkingDaysChart = new Chart(ctx, {
      type: 'line',

      data: {
        labels,
        datasets: [
          {
            label: 'Line Dataset',
            data: lineValue,
            borderJoinStyle: 'miter',
            type: 'line',
            fill: false,
            borderColor: colorTravelTimeAverage,
            borderWidth: 2,
            order: 1,
          },
          {
            data: travelTimes,
            fill: true,
            lineTension: 0.3,
            backgroundColor: gradientFill,
            borderWidth: 0,
            order: 2,
          },
        ],
      },
      options: {
        animation: {
          easing: 'easeInOutBack',
        },
        title: {
          display: true,
          text: title,
          fontColor: colorTitle,
        },
        maintainAspectRatio: true,
        aspectRatio: 4,
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: showGrid,
                color: colorGrid,
                zeroLineColor: colorGrid,
                tickMarkLength: 0,
                drawBorder: false,
              },
              ticks: {
                padding: 10,
                display: showGrid,
                beginAtZero: true,
                suggestedMax: maxForDisplay,
                stepSize: 60,
                callback: function (value, _index, _values) {
                  return formatDuration(Number(value));
                },
              },
            },
          ],
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            display: false,
          },
        },
      },
    });
  }

  afterUpdate(createChart);
</script>

<div class="dashboard__container dashboard__container-element--full">
  <canvas id="allWorkingDaysChart" />
</div>
