export function cleanHTML(html) {
  return html
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function formatTelegramMessage(title, excerpt, link) {
  return `<b>🔥 New Post Alert! 🔥</b>

<b>${cleanHTML(title)}</b>

${cleanHTML(excerpt)}

<a href="${link}">Check it out!</a>`;
}
