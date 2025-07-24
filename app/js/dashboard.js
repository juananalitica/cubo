export function initEmbudo() {
  const citySelect = document.getElementById('embudo-city');
  const balanceEl = document.getElementById('embudo-balance');
  const ctxMonthly = document
    .getElementById('embudo-monthlyChart')
    .getContext('2d');
  const ctxDonut = document
    .getElementById('embudo-donutChart')
    .getContext('2d');
  const ctxTrend = document
    .getElementById('embudo-trendChart')
    .getContext('2d');

  const DATA = {
    medellin: {
      balance: '$1.200M',
      monthly: [120, 90, 130, 140, 110, 150],
      distribution: [40, 25, 20, 15],
      trend: [15, 18, 17, 20, 22, 19, 21],
    },
    bogota: {
      balance: '$1.500M',
      monthly: [150, 140, 160, 170, 155, 165],
      distribution: [35, 30, 20, 15],
      trend: [20, 19, 18, 23, 24, 22, 25],
    },
    cali: {
      balance: '$950M',
      monthly: [80, 85, 95, 100, 90, 105],
      distribution: [45, 20, 25, 10],
      trend: [10, 12, 11, 15, 13, 14, 16],
    },
  };

  const LABELS_MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const LABELS_DIST = ['Marketing', 'Operaciones', 'Personal', 'Otros'];
  const LABELS_TREND = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  let monthlyChart;
  let donutChart;
  let trendChart;

  function createCharts(cityData) {
    if (monthlyChart) monthlyChart.destroy();
    if (donutChart) donutChart.destroy();
    if (trendChart) trendChart.destroy();

    monthlyChart = new Chart(ctxMonthly, {
      type: 'bar',
      data: {
        labels: LABELS_MONTHS,
        datasets: [
          {
            label: 'Gastos',
            backgroundColor: '#3b82f6',
            data: cityData.monthly,
          },
        ],
      },
      options: { responsive: true },
    });

    donutChart = new Chart(ctxDonut, {
      type: 'doughnut',
      data: {
        labels: LABELS_DIST,
        datasets: [
          {
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
            data: cityData.distribution,
          },
        ],
      },
      options: { responsive: true },
    });

    trendChart = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: LABELS_TREND,
        datasets: [
          {
            label: 'Tendencia',
            borderColor: '#6366f1',
            data: cityData.trend,
            fill: false,
          },
        ],
      },
      options: { responsive: true },
    });
  }

  function updateCity() {
    const cityKey = citySelect.value;
    const data = DATA[cityKey];
    balanceEl.textContent = data.balance;
    createCharts(data);
  }

  citySelect.addEventListener('change', updateCity);
  updateCity();
}

