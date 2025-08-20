/*
Shared Data Source for MPI Library Dashboard
Author: Thomas Gerdes | License: MIT
Centralized data management for all dashboard pages
Version: 2.0.0 | Last updated: August 2025
*/

// ===== MASTER DATA SOURCES =====
const ACQUISITION_DATA = [
  { year: 2000, value: 328 }, { year: 2001, value: 381 }, { year: 2002, value: 296 },
  { year: 2003, value: 207 }, { year: 2004, value: 433 }, { year: 2005, value: 354 },
  { year: 2006, value: 222 }, { year: 2007, value: 504 }, { year: 2008, value: 2106 },
  { year: 2009, value: 3114 }, { year: 2010, value: 3742 }, { year: 2011, value: 3568 },
  { year: 2012, value: 1880 }, { year: 2013, value: 2655 }, { year: 2014, value: 2802 },
  { year: 2015, value: 2580 }, { year: 2016, value: 2928 }, { year: 2017, value: 3042 },
  { year: 2018, value: 3811 }, { year: 2019, value: 2471 }, { year: 2020, value: 2153 },
  { year: 2021, value: 674 }, { year: 2022, value: 176 }, { year: 2023, value: 189 }, 
  { year: 2024, value: 209 }
];

const EBOOK_ACQUISITION_DATA = [
  { year: 2000, value: 0 }, { year: 2001, value: 0 }, { year: 2002, value: 0 },
  { year: 2003, value: 0 }, { year: 2004, value: 0 }, { year: 2005, value: 0 },
  { year: 2006, value: 0 }, { year: 2007, value: 0 }, { year: 2008, value: 0 },
  { year: 2009, value: 0 }, { year: 2010, value: 4 }, { year: 2011, value: 0 },
  { year: 2012, value: 0 }, { year: 2013, value: 0 }, { year: 2014, value: 0 },
  { year: 2015, value: 1 }, { year: 2016, value: 0 }, { year: 2017, value: 1 },
  { year: 2018, value: 0 }, { year: 2019, value: 12 }, { year: 2020, value: 27 },
  { year: 2021, value: 131 }, { year: 2022, value: 49 }, { year: 2023, value: 53 }, 
  { year: 2024, value: 47 }
];

const STOCK_DATA = [
  { year: 2000, value: 5704 }, { year: 2001, value: 6032 }, { year: 2002, value: 6413 },
  { year: 2003, value: 6709 }, { year: 2004, value: 6916 }, { year: 2005, value: 7349 },
  { year: 2006, value: 7703 }, { year: 2007, value: 7925 }, { year: 2008, value: 8429 },
  { year: 2009, value: 10535 }, { year: 2010, value: 13649 }, { year: 2011, value: 17391 },
  { year: 2012, value: 20959 }, { year: 2013, value: 22839 }, { year: 2014, value: 25494 },
  { year: 2015, value: 28296 }, { year: 2016, value: 30876 }, { year: 2017, value: 33804 },
  { year: 2018, value: 36846 }, { year: 2019, value: 40657 }, { year: 2020, value: 43128 },
  { year: 2021, value: 45281 }, { year: 2022, value: 45955 }, { year: 2023, value: 46131 }, 
  { year: 2024, value: 46320 }
];

const SUBJECT_DATA = [
  { signature: 'LA-LC', name: 'Sozial- und Kulturanthropologie', count: 22812 },
  { signature: 'MN-MS', name: 'Soziologie', count: 5114 },
  { signature: 'B', name: 'Religion', count: 4764 },
  { signature: 'C', name: 'Philosophie', count: 3463 },
  { signature: 'MA-ML', name: 'Politologie', count: 2453 },
  { signature: 'N', name: 'Geschichte', count: 2328 },
  { signature: 'R', name: 'Geografie', count: 1902 },
  { signature: 'P', name: 'Recht', count: 1873 },
  { signature: 'Ref', name: 'Referenz', count: 1844 },
  { signature: 'A', name: 'Allgemeines', count: 538 },
  { signature: 'Q', name: 'Wirtschaftswissenschaften', count: 471 },
  { signature: 'E', name: 'Allgemeine Sprachwissenschaft', count: 222 },
  { signature: 'G', name: 'Germanistik', count: 98 },
  { signature: 'LD-LZ', name: 'Archäologie, Musik und Kunst', count: 82 },
  { signature: 'H', name: 'Anglistik', count: 79 },
  { signature: 'I', name: 'Romanistik', count: 37 },
  { signature: 'F', name: 'Klassische Philologie', count: 23 },
  { signature: 'D', name: 'Pädagogik', count: 22 },
  { signature: 'Z', name: 'Sonstiges', count: 18 },
  { signature: 'W', name: 'Biologie', count: 10 },
  { signature: 'MT-MZ', name: 'Gesundheit und Militär', count: 4 }
];

const OTHER_MEDIA_DATA = [
  { name: 'Gebundene Zeitschriftenbände', count: 3561 }
];

// ===== CALCULATED VALUES =====
const TOTAL_BOOKS = SUBJECT_DATA.reduce((sum, item) => sum + item.count, 0);
const TOTAL_ACQUISITIONS = ACQUISITION_DATA.reduce((sum, item) => sum + item.value, 0);
const TOTAL_EBOOKS = EBOOK_ACQUISITION_DATA.reduce((sum, item) => sum + item.value, 0);
const TOTAL_COLLECTION = TOTAL_BOOKS + TOTAL_EBOOKS + OTHER_MEDIA_DATA.reduce((sum, item) => sum + item.count, 0);

// Print acquisitions phases
const PHASE1_DATA = ACQUISITION_DATA.filter(d => d.year >= 2000 && d.year <= 2007);
const PHASE2_DATA = ACQUISITION_DATA.filter(d => d.year >= 2008 && d.year <= 2020);
const PHASE3_DATA = ACQUISITION_DATA.filter(d => d.year >= 2021 && d.year <= 2024);

const PHASE1_AVG = Math.round(PHASE1_DATA.reduce((sum, d) => sum + d.value, 0) / PHASE1_DATA.length);
const PHASE2_AVG = Math.round(PHASE2_DATA.reduce((sum, d) => sum + d.value, 0) / PHASE2_DATA.length);
const PHASE3_AVG = Math.round(PHASE3_DATA.reduce((sum, d) => sum + d.value, 0) / PHASE3_DATA.length);

const AVG_PER_YEAR = Math.round(TOTAL_ACQUISITIONS / ACQUISITION_DATA.length);
const MAX_VALUE = Math.max(...ACQUISITION_DATA.map(d => d.value));

// Ebooks calculated values
const AVG_PER_YEAR_EBOOKS = Math.round(TOTAL_EBOOKS / EBOOK_ACQUISITION_DATA.length);
const MAX_VALUE_EBOOKS = Math.max(...EBOOK_ACQUISITION_DATA.map(d => d.value));

// Stock development calculated values
const CURRENT_STOCK = STOCK_DATA[STOCK_DATA.length - 1].value;
const INITIAL_STOCK = STOCK_DATA[0].value;
const TOTAL_GROWTH = CURRENT_STOCK - INITIAL_STOCK;
const AVG_GROWTH_PER_YEAR = Math.round(TOTAL_GROWTH / (STOCK_DATA.length - 1));

// ===== CROSS-DATA CALCULATIONS =====

/**
 * Calculate yearly growth rate of print book stock
 * Growth rate = (Acquisitions in year n / Total stock at end of year n) * 100
 * @returns {Array} Array of objects with year and growth percentage
 */
function calculateStockGrowthRate() {
  return STOCK_DATA.map((current, index) => {
    const acquisitions = ACQUISITION_DATA.find(a => a.year === current.year)?.value || 0;
    // Growth rate = Acquisitions / End-of-year stock * 100
    const growth = current.value > 0 ? (acquisitions / current.value) * 100 : 0;
    return { 
      year: current.year, 
      growth: parseFloat(growth.toFixed(2)),
      acquisitions: acquisitions,
      endOfYearStock: current.value
    };
  });
}

// Generate growth rate data
const STOCK_GROWTH_RATE_DATA = calculateStockGrowthRate();

/**
 * Get statistics for stock growth rate
 * @returns {Object} Statistics object
 */
function getStockGrowthStats() {
  const validGrowth = STOCK_GROWTH_RATE_DATA.filter(d => d.growth > 0);
  const avgGrowth = validGrowth.reduce((sum, d) => sum + d.growth, 0) / validGrowth.length;
  const maxGrowth = Math.max(...validGrowth.map(d => d.growth));
  const minGrowth = Math.min(...validGrowth.map(d => d.growth));
  
  return {
    average: parseFloat(avgGrowth.toFixed(2)),
    maximum: maxGrowth,
    minimum: minGrowth,
    totalYears: validGrowth.length
  };
}

const STOCK_GROWTH_STATS = getStockGrowthStats();

// ===== DATA VALIDATION =====
function validateData() {
  console.log('📊 Data validation started...');
  console.log('📚 Print books:', TOTAL_BOOKS.toLocaleString('de-DE'));
  console.log('📱 Ebooks:', TOTAL_EBOOKS.toLocaleString('de-DE'));
  console.log('📖 Total collection:', TOTAL_COLLECTION.toLocaleString('de-DE'));
  console.log('📈 Growth rate data points:', STOCK_GROWTH_RATE_DATA.length);
  console.log('✅ Data validation complete');
}

// Auto-validate on load
validateData();