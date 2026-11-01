import { useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos.js';
import PhotoCard from './PhotoCard.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function Gallery({ searchTerm, favourites, onToggleFavourite }) {
  const { photos, loading, error } = useFetchPhotos();

  const handleToggle = useCallback(
    (photoId) => {
      onToggleFavourite(photoId);
    },
    [onToggleFavourite],
  );

  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) return photos;
    const needle = searchTerm.trim().toLowerCase();
    return photos.filter((photo) => photo.author.toLowerCase().includes(needle));
  }, [photos, searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-sm text-gray-500">
          No photos match “<span className="font-medium text-gray-700">{searchTerm}</span>”. Try a different author name.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Photo gallery"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {filteredPhotos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favourites.includes(photo.id)}
          onToggleFavourite={handleToggle}
        />
      ))}
    </section>
  );
}
