"use client"
import Modal from "@/components/Modal/Modal"

import css from "./NotePreview.module.css"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { fetchNoteById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"


const NotePreview = () => {
    const { id } = useParams<{id:string}>()
    const router = useRouter()

    const {data: note} = useQuery({
        queryKey:["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    })

    const handleBack = () => {
        const isSure = confirm("Are you sure")
        if(isSure){
            router.back()
        }
    }

return(
        <Modal>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2 className={css.h2}>{note?.title}</h2>
                        <button type="button" className={css.backBtn} onClick={handleBack}>Back</button>
                    </div>
                    <p>{note?.content}</p>
                    <p>{note?.createdAt}</p>
                    <p>{note?.tag}</p>

                </div>
            </div>
            

        </Modal>
    )
}

export default NotePreview