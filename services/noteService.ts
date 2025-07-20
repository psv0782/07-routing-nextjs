import axios from "axios";
import {CreateNote, Note} from "@/types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
    throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is not defined in environment variables");
}

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

interface FetchNotes {
    notes: Note[];
    totalPages: number;
}

interface FetchParams {
    search?: string;
    page?: number;
    perPage?: number;
}

// Отримання списку нотаток
export async function fetchNotes(
    searchText: string,
    page: number,
    perPage: number = 12
): Promise<FetchNotes> {
    const params: FetchParams = {
        ...(searchText.trim() !== "" && {search: searchText.trim()}),
        page,
        perPage,
    };

    const res = await axiosInstance.get<FetchNotes>("/", {params});
    return res.data;
}

// Створення нової нотатки
export async function createNote(newNote: CreateNote): Promise<Note> {
    const res = await axiosInstance.post<Note>("/", newNote);
    return res.data;
}

// Видалення нотатки за ID
export async function deleteNote(noteId: number): Promise<Note> {
    const res = await axiosInstance.delete<Note>(`/${noteId}`);
    return res.data;
}

console.log("TOKEN from env:", process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);