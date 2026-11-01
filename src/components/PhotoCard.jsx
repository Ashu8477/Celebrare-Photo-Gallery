export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const handleClick = () => onToggleFavourite(photo.id);

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <button
          type="button"
          onClick={handleClick}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove ${photo.author} from favourites`
              : `Add ${photo.author} to favourites`
          }
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm ring-1 ring-gray-200 backdrop-blur transition-colors hover:bg-white hover:text-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 transition-colors ${isFavourite ? 'text-rose-500' : ''}`}
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p
          className="truncate text-sm font-medium text-gray-800"
          title={photo.author}
        >
          {photo.author}
        </p>
        <span className="shrink-0 text-[11px] uppercase tracking-wide text-gray-400">
          #{photo.id.slice(0, 6)}
        </span>
      </div>
    </article>
  );
}
