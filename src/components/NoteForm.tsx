import { createSignal, For, Show } from 'solid-js';
import store from '../store';

export interface Note {
  title: string;
  background: string;
}
const COLORS = ['pink', 'purple', 'yellow', 'blue', 'green'];

const NoteForm = () => {
  const [title, setTitle] = createSignal('');
  const [backgroundColor, setBackgroundColor] = createSignal('orange');
  const { addNote } = store;

  return (
    <form
      class="p-4 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        addNote({
          title: title(),
          background: backgroundColor(),
        });
        setTitle('');
      }}
    >
      <textarea
        class="w-[500px] min-h-[100px] outline-none"
        placeholder="Enter your note here..."
        value={title()}
        onInput={(e) => setTitle((e.target as HTMLTextAreaElement).value)}
      ></textarea>
      <div class="flex justify-between">
        <ul class="flex gap-1">
          <For each={COLORS}>
            {(color) => (
              <li
                style={{ 'background-color': color }}
                class="rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
                onClick={() => setBackgroundColor(color)}
              >
                <Show when={backgroundColor() === color}>✓</Show>
              </li>
            )}
          </For>
        </ul>
        <button class="rounded-2xl bg-green-500 py-1 px-8 text-white">
          ADD
        </button>
      </div>
    </form>
  );
};
export default NoteForm;
