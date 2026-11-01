# Celebrare Photo Gallery

A modern, responsive photo gallery web application built with React.js and Tailwind CSS. This project fetches photos from the Lorem Picsum API and allows users to search by author name and save favorites.

## Technologies Used

- **React.js 18** - UI library with functional components and hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lorem Picsum API** - Free placeholder image service

## API Endpoint

```
https://picsum.photos/v2/list?limit=30
```

Returns an array of photo objects with `id`, `author`, and `download_url` fields.

## Features

✅ Responsive photo grid (4 columns desktop, 2 tablet, 1 mobile)  
✅ Custom `useFetchPhotos` hook for API fetching  
✅ Real-time search filter by author name  
✅ Favourites management with `useReducer`  
✅ LocalStorage persistence for favourites  
✅ Loading spinner and error handling  
✅ Clean, minimal UI design  
✅ Heart icon toggle for favourites  

## Project Folder Structure

```
Celebrare-Photo-Gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx         # Main gallery with filtering logic
│   │   ├── PhotoCard.jsx       # Individual photo card component
│   │   ├── SearchBar.jsx       # Search input component
│   │   ├── LoadingSpinner.jsx  # Loading state indicator
│   │   └── ErrorMessage.jsx    # Error display component
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook for fetching photos
│   ├── reducers/
│   │   └── favouritesReducer.js # Reducer for favourites state
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## Installation Instructions

1. Navigate to the project folder:
   ```bash
   cd Celebrare-Photo-Gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:5173`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## React Concepts Explained

### useFetchPhotos (Custom Hook)

This custom hook encapsulates all API fetching logic. It returns three values:
- `photos` - Array of photo data
- `loading` - Boolean indicating if data is being fetched
- `error` - Error message if the request fails

**Why use a custom hook?** It separates concerns—the Gallery component doesn't need to know how data is fetched, only that it receives photos, loading state, and errors.

### useReducer

Used instead of `useState` for managing favourites because:
- The state logic involves multiple actions (ADD, REMOVE, SET)
- It makes the code more organized and testable
- Each action type has a clear purpose in the reducer

```javascript
const [favourites, dispatch] = useReducer(favouritesReducer, initialState);
```

Actions handled:
- `ADD_FAVOURITE` - Adds a photo ID to favourites
- `REMOVE_FAVOURITE` - Removes a photo ID from favourites
- `SET_FAVOURITES` - Restores favourites from LocalStorage on app load

### useCallback

Used for the search filter handler in `App.jsx` passed down to `SearchBar`:

```javascript
const handleSearchChange = useCallback((value) => {
  setSearchTerm(value);
}, []);
```

And also for the favourite toggle handler in `Gallery.jsx`:

```javascript
const handleToggle = useCallback(
  (photoId) => {
    onToggleFavourite(photoId);
  },
  [onToggleFavourite],
);
```

**Why?** `useCallback` memoizes functions so they maintain referential equality across re-renders, preventing child components (`SearchBar` & `PhotoCard`) from unnecessary re-renders.

### useMemo

Used to compute the filtered photo list:

```javascript
const filteredPhotos = useMemo(() => {
  if (!searchTerm.trim()) return photos;
  const needle = searchTerm.trim().toLowerCase();
  return photos.filter((photo) => photo.author.toLowerCase().includes(needle));
}, [photos, searchTerm]);
```

**Why?** The filtered list is only recalculated when `photos` or `searchTerm` changes—not on every render (e.g., when toggling favourites). This improves performance.

### LocalStorage Implementation

Favourites persist across page refreshes using LocalStorage:

1. **On mount:** Read from LocalStorage and dispatch `SET_FAVOURITES`
2. **On change:** Write current favourites to LocalStorage
3. **Error handling:** Invalid JSON is caught and ignored

```javascript
// Saving
localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));

// Loading
const saved = localStorage.getItem(STORAGE_KEY);
const parsed = JSON.parse(saved);
dispatch({ type: 'SET_FAVOURITES', payload: parsed });
```

Key used: `celebrare-favourites`

## Testing Checklist

- [x] 30 photos load on initial page load
- [x] Author names display correctly
- [x] Search filters photos in real-time
- [x] Heart icon toggles favourite state
- [x] Favourites persist after browser refresh
- [x] Responsive layout works on mobile/tablet/desktop
- [x] Loading spinner shows during fetch
- [x] Error message displays on API failure
- [x] No console errors

## Development Server

The app is currently running at: **http://localhost:5173**

---

*Built for Celebrare internship pre-screening assignment.*
