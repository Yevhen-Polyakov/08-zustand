import axios from "axios";
import { NewNote, Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? "";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export async function fetchNotes(query: string, page: number, tag:string,): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage: 12,
      tag: tag === "all" ? undefined : tag,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
}

