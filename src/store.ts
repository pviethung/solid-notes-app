import { createRoot, createSignal } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { Note } from './components/NoteForm';

function createAppStore() {
  const [query, setQuery] = createSignal('');
  const [notes, setNotes] = createStore<Note[]>([]);

  const changeFilterQuery = (q: string) => {
    setQuery(q);
  };
  const addNote = (note: Note) =>
    setNotes(produce((notes) => notes.push(note)));
  const deleteNote = (_note: Note) =>
    setNotes(
      produce((notes) => {
        const deleteIdx = notes.findIndex((note) => note.title === _note.title);
        if (deleteIdx > -1) {
          notes.splice(deleteIdx, 1);
        }
      })
    );

  return {
    query,
    notes,
    addNote,
    deleteNote,
    changeFilterQuery,
  };
}

export default createRoot(createAppStore);
