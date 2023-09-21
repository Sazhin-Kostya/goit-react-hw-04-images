export default function LoadMoreButton({ handleLoadMore }) {
  return (
    <>
      <button type="button" onClick={handleLoadMore} className="Button">
        Load More
      </button>
    </>
  );
}
