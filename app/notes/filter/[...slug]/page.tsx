import NotesClient from "./Notes.client";
import {fetchNotes} from "@/lib/api";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function AppPage({params}: Props) {
    const initialSearch = "";
    const initialPage = 1;
    const {slug} = await params;
    const category = slug[0] === "all" ? undefined : slug[0];
    const data = await fetchNotes("", 1, 9, category);

    return <NotesClient initialSearch={initialSearch}
                        initialPage={initialPage} initialData={data} category={category}/>;
}