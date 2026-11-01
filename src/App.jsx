import { useCallback, useEffect, useReducer, useState } from 'react';
import Gallery from './components/Gallery.jsx';
import SearchBar from './components/SearchBar.jsx';
import favouritesReducer, {
  initialState as favouritesInitialState,
} from './reducers/favouritesReducer.js';

const STORAGE_KEY = 'celebrare-favourites';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const [favourites, dispatch] = useReducer(favouritesReducer, favouritesInitialState);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        dispatch({ type: 'SET_FAVOURITES', payload: parsed });
      }
    } catch (err) {
      console.warn('Could not restore favourites from LocalStorage:', err);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.warn('Could not save favourites to LocalStorage:', err);
    }
  }, [favourites]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Photo Gallery
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse 30 curated photos from Picsum. Search by author and tap the heart to save your favourites.
            </p>
          </div>

          <div className="w-full lg:max-w-xs">
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Gallery
          searchTerm={searchTerm}
          favourites={favourites}
          onToggleFavourite={handleToggleFavourite}
        />
      </main>

      <footer className="border-t border-gray-200 bg-white py-6">
        <p className="text-center text-xs text-gray-400">
          Photos courtesy of{' '}
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Lorem Picsum
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
