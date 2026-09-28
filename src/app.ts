interface Note {
  id: number;
  text: string;
}

const quickNote = document.getElementById("quickNote") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const noteList = document.getElementById("noteList") as HTMLDivElement;

let notes: Note[] = loadNotes();

function loadNotes(): Note[] {
  const saved = localStorage.getItem("quick-notes");
  return saved ? JSON.parse(saved) as Note[] : [];
}

function saveNotes(): void {
  localStorage.setItem("quick-notes", JSON.stringify(notes));
}

function renderNotes(): void {
  noteList.innerHTML = "";

  if (notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No notes yet.";
    noteList.appendChild(empty);
    return;
  }

  notes.forEach((note) => {
    const item = document.createElement("div");
    item.className = "note";

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      notes = notes.filter((currentNote) => currentNote.id !== note.id);
      saveNotes();
      renderNotes();
    });

    item.appendChild(text);
    item.appendChild(deleteButton);
    noteList.appendChild(item);
  });
}

function addNote(): void {
  const text = quickNote.value.trim();

  if (text === "") {
    alert("Please write a note.");
    return;
  }

  notes.push({
    id: Date.now(),
    text: text
  });

  saveNotes();
  renderNotes();
  quickNote.value = "";
  quickNote.focus();
}

addButton.addEventListener("click", addNote);

quickNote.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNote();
  }
});

renderNotes();
