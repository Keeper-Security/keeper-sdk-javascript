/** Fixed-width column formatter. Last column is left unpadded. */
export function formatTable(headers: string[], rows: string[][]): string {
    if (rows.length === 0) return ''
    const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => (r[i] ?? '').length)))
    const fmt = (cells: string[]): string =>
        cells.map((s, i) => (i === cells.length - 1 ? s : (s ?? '').padEnd(widths[i]))).join('  ')
    return [fmt(headers), ...rows.map(fmt)].join('\n') + '\n'
}
