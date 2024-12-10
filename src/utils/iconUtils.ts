import { isValidUrl } from './urlUtils';

export async function validateIconUrl(url: string): Promise<boolean> {
  if (!url) return false;
  if (!isValidUrl(url)) return false;

  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error validating icon:', error);
    return false;
  }
}

export function getIconUrl(url: string): string {
  if (!url) return '';
  
  try {
    const fullUrl = addHttpsIfMissing(url);
    if (isImageUrl(fullUrl)) {
      return fullUrl;
    }
    return getFaviconUrl(fullUrl);
  } catch (error) {
    console.error('Error processing icon URL:', error);
    return '';
  }
}

function addHttpsIfMissing(url: string): string {
  return url.startsWith('http') ? url : `https://${url}`;
}

function isImageUrl(url: string): boolean {
  return /\.(ico|png|svg|jpg|jpeg|gif)$/i.test(url);
}

function getFaviconUrl(url: string): string {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}