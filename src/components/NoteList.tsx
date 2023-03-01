import Masonry from 'masonry-layout';
import { createEffect, For, onMount } from 'solid-js';
import store from '../store';

const NoteList = () => {
  const { query, notes, deleteNote } = store;
  let ref: HTMLUListElement;
  let msnry: Masonry;
  const filteredNotes = () =>
    notes.filter((note) => note.title.includes(query()));

  onMount(() => {
    msnry = new Masonry('.grid-container', {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10,
      fitWidth: true,
    });
  });

  createEffect(() => {
    if (!msnry) return;
    if (filteredNotes().length) {
      if (msnry.reloadItems) msnry.reloadItems();
      if (msnry.layout) msnry.layout();
    }
  });

  return (
    <ul ref={ref!} class="grid-container">
      <For each={filteredNotes()}>
        {(note) => (
          <li
            class="p-2 group relative transition-shadow w-[200px] mb-[10px] note shadow-[0_1px_3px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.19),_0_6px_6px_rgba(0,0,0,0.23)]"
            style={{ 'background-color': note.background }}
          >
            {note.title}
            <button
              onClick={() => deleteNote(note)}
              class="absolute right-3 top-1 text-sm hidden group-hover:block"
            >
              x
            </button>
          </li>
        )}
      </For>
    </ul>
  );
};
export default NoteList;
