/**
 * @function formatCurrency
 * Format number as currency (US Dollars)
 *
 * @param {number} amount
 * @returns {string} number formatted as currency
 *
 * @example
 *    formatCurrency(0)
 *     => $0.00
 *
 * @example
 *    formatCurrency(1.5)
 *     => $1.5
 *
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimunFractionDigits: 2,
  }).format(amount)
