/*
Shared Functions for MPI Library Dashboard
Author: Thomas Gerdes | License: MIT
Centralized utility functions for all dashboard pages
Version: 2.0.0 | Last updated: August 2025
*/

// ===== UTILITY FUNCTIONS =====

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}

/**
 * Update active button styling for chart type toggles
 * @param {string} activeType - Currently active chart type
 * @param {string} lineButtonId - ID of line chart button
 * @param {string} barButtonId - ID of bar chart button
 * @param {string} pieButtonId - ID of pie chart button (optional)
 */
function updateActiveButtons(activeType, lineButtonId, barButtonId, pieButtonId = null) {
  const lineBtn = document.getElementById(lineButtonId);
  const barBtn = document.getElementById(barButtonId);
  const pieBtn = pieButtonId ? document.getElementById(pieButtonId) : null;
  
  // Reset all buttons
  [lineBtn, barBtn, pieBtn].filter(btn => btn).forEach(btn => {
    btn.style.background = '#007bff';
    btn.setAttribute('aria-pressed', 'false');
  });
  
  // Set active button
  switch(activeType) {
    case 'line':
      if (lineBtn) {
        lineBtn.style.background = '#28a745';
        lineBtn.setAttribute('aria-pressed', 'true');
      }
      break;
    case 'bar':
      if (barBtn) {
        barBtn.style.background = '#28a745';
        barBtn.setAttribute('aria-pressed', 'true');
      }
      break;
    case 'pie':
      if (pieBtn) {
        pieBtn.style.background = '#28a745';
        pieBtn.setAttribute('aria-pressed', 'true');
      }
      break;
  }
}

/**
 * Handle chart download
 * @param {Chart} chart - Chart.js instance
 * @param {string} filename - Download filename
 * @param {string} chartName - Chart name for announcements
 */
function downloadChart(chart, filename, chartName) {
  try {
    const link = document.createElement('a');
    link.download = filename;
    link.href = chart.toBase64Image();
    link.click();
    announceToScreenReader(`Download des ${chartName} gestartet`);
  } catch (error) {
    console.error('Download failed:', error);
    announceToScreenReader('Download fehlgeschlagen');
  }
}

/**
 * Handle chart errors
 * @param {string} chartName - Name of the chart
 * @param {Error} error - Error object
 */
function handleChartError(chartName, error) {
  console.error(`Error in ${chartName}:`, error);
  announceToScreenReader(`Fehler beim Laden des ${chartName}-Diagramms`);
}

/**
 * Generate color palette for charts
 * @param {number} count - Number of colors needed
 * @returns {Array} Array of color strings
 */
function generateColors(count) {
  const baseColors = [
    '#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', 
    '#6f42c1', '#fd7e14', '#20c997', '#6c757d', '#e83e8c'
  ];
  
  const alphaColors = [
    '#007bff80', '#28a74580', '#dc354580', '#ffc10780', '#17a2b880',
    '#6f42c180', '#fd7e1480', '#20c99780', '#6c757d80', '#e83e8c80'
  ];
  
  const lightColors = [
    '#007bff40', '#28a74540', '#dc354540', '#ffc10740', '#17a2b840',
    '#6f42c140', '#fd7e1440', '#20c99740', '#6c757d40', '#e83e8c40'
  ];
  
  const allColors = [...baseColors, ...alphaColors, ...lightColors];
  
  // Return colors, repeating if necessary
  return Array.from({length: count}, (_, i) => allColors[i % allColors.length]);
}

/**
 * Format number with German locale
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(number) {
  return number.toLocaleString('de-DE');
}

/**
 * Generate standard chart configuration
 * @param {string} type - Chart type ('line', 'bar', 'pie')
 * @param {Object} data - Chart data
 * @param {Object} options - Additional options
 * @returns {Object} Chart configuration
 */
function getStandardChartConfig(type, data, options = {}) {
  const baseConfig = {
    type: type,
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      plugins: { 
        legend: { 
          display: true, 
          position: 'bottom', 
          labels: { 
            boxWidth: 15, 
            padding: 10, 
            font: { size: 10 }, 
            usePointStyle: true 
          } 
        } 
      },
      interaction: { intersect: false, mode: 'index' },
      ...options
    }
  };
  
  // Add scales for line and bar charts
  if (type === 'line' || type === 'bar') {
    baseConfig.options.scales = {
      x: { 
        title: { display: true, text: 'Jahr', font: { size: 12 } }, 
        ticks: { font: { size: 10 } } 
      },
      y: { 
        title: { display: true, text: 'Anzahl', font: { size: 12 } }, 
        beginAtZero: true, 
        ticks: { font: { size: 10 } } 
      },
      ...options.scales
    };
  }
  
  return baseConfig;
}

/**
 * Initialize keyboard navigation support
 */
function initKeyboardNavigation() {
  document.addEventListener('keydown', function(event) {
    if (event.target.matches('button[id*="Btn"]') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.target.click();
    }
  });
}

/**
 * Add resize handler for charts
 * @param {Array} charts - Array of Chart.js instances
 */
function addResizeHandler(charts) {
  window.addEventListener('resize', function() {
    setTimeout(() => {
      charts.forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
          chart.resize();
        }
      });
    }, 100);
  });
}

/**
 * Initialize common dashboard functionality
 * @param {Array} charts - Array of Chart.js instances
 */
function initDashboard(charts = []) {
  initKeyboardNavigation();
  addResizeHandler(charts);
  announceToScreenReader('Dashboard wurde erfolgreich geladen');
  console.log('✅ Dashboard initialization complete');
}

/**
 * Generate table HTML
 * @param {Array} data - Data array
 * @param {Array} columns - Column configuration
 * @param {Object} options - Table options
 * @returns {string} HTML table string
 */
function generateTable(data, columns, options = {}) {
  const { 
    sortBy = null, 
    sortDesc = false,
    className = 'table table-striped table-hover',
    ariaLabel = 'Data table'
  } = options;
  
  // Sort data if requested
  let sortedData = [...data];
  if (sortBy) {
    sortedData.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDesc ? -comparison : comparison;
    });
  }
  
  // Generate header
  const headerRows = columns.map(col => 
    `<th scope="col">${col.title}</th>`
  ).join('');
  
  // Generate data rows
  const dataRows = sortedData.map(row => {
    const cells = columns.map(col => {
      let value = row[col.field];
      if (col.formatter) {
        value = col.formatter(value, row);
      }
      return `<td>${value}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('');
  
  return `
    <table class="${className}" data-quarto-disable-processing="true" role="table" aria-label="${ariaLabel}">
      <thead>
        <tr>${headerRows}</tr>
      </thead>
      <tbody>
        ${dataRows}
      </tbody>
    </table>
  `;
}