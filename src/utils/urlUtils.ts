export function isValidUrl(url: string): boolean {
  try {
    new URL(addHttpsIfMissing(url));
    return true;
  } catch {
    return false;
  }
}

function addHttpsIfMissing(url: string): string {
  return url.startsWith('http') ? url : `https://${url}`;
}