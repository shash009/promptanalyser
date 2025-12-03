// Small formatting helpers used by UI components
export function formatRank(avgRank) {
  if (avgRank === null || avgRank === undefined || avgRank === 'null') return '—';
  // If avgRank is a number-like string, keep one decimal when present
  const n = Number(avgRank);
  if (Number.isNaN(n)) return String(avgRank);
  // If integer, show without decimal; otherwise one decimal
  const formatted = n % 1 === 0 ? String(n) : n.toFixed(1);
  return `#${formatted}`;
}

export function formatMentions(mentions, total) {
  const m = Number.isNaN(Number(mentions)) ? 0 : Number(mentions);
  const t = Number.isNaN(Number(total)) ? m : Number(total);
  return `${m}/${t}`;
}

export function formatScore(score) {
  const n = Number(score) || 0;
  return Math.round(n);
}

export default { formatRank, formatMentions, formatScore };
