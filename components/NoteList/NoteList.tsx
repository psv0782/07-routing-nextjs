'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import css from './NoteList.module.css';
import {Note} from "@/types/note";
import {deleteNote} from "@/lib/api";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    return (
        <>
            {isPending && <p className={css.message}>Deleting note...</p>}
            {isError && (
                <p className={css.error}>
                    Error deleting note: {(error as Error).message}
                </p>
            )}

            <ul className={css.list}>
                {notes.map((note: Note) => {
                    const { id, title, content, tag } = note;
                    return (
                        <li key={id} className={css.listItem}>
                            <Link href={`/notes/${id}`} className={css.link}>
                                <h2 className={css.title}>{title}</h2>
                            </Link>
                            <p className={css.content}>{content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{tag}</span>
                                <button
                                    className={css.button}
                                    onClick={() => mutate(id)}
                                    disabled={isPending}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
