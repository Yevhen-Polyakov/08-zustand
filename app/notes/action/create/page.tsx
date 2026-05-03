import NoteForm from "@/components/NoteForm/NoteForm"
import css from "./CreateNote.module.css"
import { categories } from "../../filter/@sidebar/default"
import { NoteTag } from "@/types/note"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Note",
    description:"Create a new note in NoteHub.",
    openGraph:{
        title:"Create Note",
        description:"Create a new note in NoteHub.",
        url: process.env.NEXT_PUBLIC_APP_URL ?? "https://08-zustand-gules-one.vercel.app/",
        images:[{
            url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt:"Create Note",
      }
    ],
    }
}
const CreateNote = () => {
    return(
       <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
	            <NoteForm categories={categories as NoteTag[]} />
            </div>
        </main>
 
    )
}

export default CreateNote