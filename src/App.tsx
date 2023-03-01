import { createSignal, onMount } from 'solid-js';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchForm from './components/SearchForm';
// TODO fetch resource
// styling
const App = () => {
  const [randomQuote, setRandomQuote] = createSignal('Loading quote...');

  onMount(async () => {
    const res = await fetch('https://api.quotable.io/random');
    const json = await res.json();

    setRandomQuote(json.content);
  });

  return (
    <div class="bg-gray-200 h-screen">
      <div class="w-[960px] m-auto flex flex-col items-center">
        <div class="mt-2" />
        <div class="text-gray-500 text-center">
          <h1 class="font-semibold text-2xl mb-2">NotesApp</h1>
          <p>{randomQuote()}</p>
        </div>
        <div class="mt-4" />
        <SearchForm />
        <div class="mt-4" />
        <NoteForm />
        <div class="mt-4" />
        <NoteList />
      </div>
    </div>
  );
};

export default App;
