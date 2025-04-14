export const summarizeNotes = async (notesArray) => {
  const response = await fetch("http://localhost:8001/summarize-notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notes: notesArray }),
  });
  if (!response.ok) {
    throw new Error("Failed to summarize notes");
  }
  const data = await response.json();
  return data.summary;
};
