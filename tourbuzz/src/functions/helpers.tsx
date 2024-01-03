export function timestampToYYYYMMDD(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function timestampToYYYYMMDDHHMMSS(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function generateSlug(title: string) {
    return title.trim()                     // Remove leading and trailing spaces
      .toLowerCase()                       // Convert to lowercase
      .replace(/\s+/g, '-')                // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '')             // Remove non-word characters except hyphens
      .replace(/^-+|-+$/g, '');            // Remove leading and trailing hyphens
  }