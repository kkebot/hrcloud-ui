export const wrapText = (t, m) => {
  if (!t || t.length <= m) {
    return t || ''
  } else
    return t.slice(0, m) + "..."
};