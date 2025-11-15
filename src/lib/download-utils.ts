export interface DownloadableFile {
  url: string
  filename: string
}

/**
 * Download a single file
 */
export async function downloadFile(file: DownloadableFile) {
  try {
    const response = await fetch(file.url)
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`)
    }
    const blob = await response.blob()

    // Create a temporary link element and trigger download
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading file:', error)
    throw error
  }
}

/**
 * Get filename from URL or file object
 */
export function getFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1)
    return decodeURIComponent(filename) || 'download'
  } catch {
    return 'download'
  }
}
