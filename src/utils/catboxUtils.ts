import { isValidUrl } from './urlUtils';

/**
 * Uploads a file to the Catbox API and returns the file URL if successful.
 *
 * @param file - A Blob or File object representing the file to upload.
 * @returns A promise that resolves to the uploaded file's URL or null if the upload fails.
 */
export async function uploadToCatbox(file: Blob): Promise<string | null> {
  if (!file) {
    console.error('No file provided for upload.');
    return null;
  }

  try {
    // Prepare the form data
    const formData = new FormData();
    formData.append('reqtype', 'fileupload');
    formData.append('fileToUpload', file, (file as File).name || 'upload.file');

    // Send the request to the Catbox API
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
    });

    // Check for a valid HTTP response
    if (!response.ok) {
      throw new Error(
        `Upload failed with status: ${response.status} ${response.statusText}`
      );
    }

    // Parse the response as text (expected to be the URL)
    const url = (await response.text()).trim();
    if (!isValidUrl(url)) {
      throw new Error(`Invalid URL received from Catbox API: ${url}`);
    }

    return url;
  } catch (error) {
    console.error('Error uploading to Catbox:', error);
    return null;
  }
}
