import {
  useState,
  useReducer,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import useFetchPhotos from './hooks/useFetchPhotos'
import { favoritesReducer } from './favoritesReducer'
function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')
  const handleSearch = useCallback((event) => {
  setSearch(event.target.value)
}, [])
  const [favorites, dispatch] = useReducer(
  favoritesReducer,
  [],
  () => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  }
)
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])
const filteredPhotos = useMemo(() => {
  return photos.filter((photo) =>
    photo.author.toLowerCase().includes(search.toLowerCase())
  )
}, [photos, search])
  if (loading) {
    return <p className="p-8 text-center">Loading photos...</p>
  }

  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Celebrare Photo Gallery
      </h1>
        <input
  type="text"
  placeholder="Search by author..."
  value={search}
  onChange={handleSearch}
  className="mb-6 w-full rounded-lg border bg-white p-3"
/>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-lg bg-white shadow">
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="h-48 w-full object-cover"
            />
            <p className="p-3 font-medium">{photo.author}</p>
            <button
  onClick={() =>
    dispatch({ type: 'TOGGLE_FAVORITE', id: photo.id })
  }
  className="p-3 text-2xl"
  aria-label={
    favorites.includes(photo.id)
      ? 'Remove from favorites'
      : 'Add to favorites'
  }
>
  {favorites.includes(photo.id) ? '❤️' : '🤍'}
</button>
          </div>
        ))}
    </div>
    </div>
  )
}

export default App