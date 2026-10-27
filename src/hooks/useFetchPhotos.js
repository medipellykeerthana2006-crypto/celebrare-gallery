import { useState, useEffect } from 'react'
function useFetchPhotos() {
const [photos, setPhotos] = useState([])
const [loading, setLoading] = useState(true)
console.log('photo hook started')
const [error, setError] = useState(null)
useEffect(() => {
  async function fetchPhotos() {
    try {
      
      const controller = new AbortController()

const timeoutId = setTimeout(() => controller.abort(), 10000)

const response = await fetch(
  'https://picsum.photos/v2/list?limit=30',
  { signal: controller.signal }
)

clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to fetch photos')
      }

      const data = await response.json()
      setPhotos(data)
   } catch (err) {
  console.error('Photo fetch error:', err)
  setError(
    err.name === 'AbortError'
      ? 'Request timed out. Please check your internet and try again.'
      : 'Unable to load photos. Please check your internet connection.'
  )
    } finally {
      setLoading(false)
      console.log('photo loading finished')
    }
  }

  fetchPhotos()
}, [])
return { photos, loading, error }
}
export default useFetchPhotos