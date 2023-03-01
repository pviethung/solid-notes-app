import store from '../store';

const SearchForm = () => {
  const { changeFilterQuery } = store;

  return (
    <form>
      <input
        onInput={(e) => {
          changeFilterQuery((e.target as HTMLInputElement).value);
        }}
        class="rounded-2xl border border-gray-500 outline-none px-5 py-1"
        placeholder="Search..."
        type="text"
      />
    </form>
  );
};
export default SearchForm;
