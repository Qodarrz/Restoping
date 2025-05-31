/**
 * Format angka harga menjadi string tanpa desimal,
 * dengan pemisah ribuan titik (format Indonesia).
 * Mengembalikan 'N/A' jika input tidak valid.
 *
 * @param {number|string} price
 * @returns {string}
 */
const formatPrice = (price) => {
  const num = typeof price === 'number'
    ? price
    : typeof price === 'string'
      ? parseFloat(price)
      : NaN;

  return isNaN(num)
    ? 'N/A'
    : new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
};

export { formatPrice };
