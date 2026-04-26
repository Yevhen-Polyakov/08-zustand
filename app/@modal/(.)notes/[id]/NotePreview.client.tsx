"use client"
import Modal from "@/components/Modal/Modal"

import css from "./NotePreview.module.css"
import { useRouter } from "next/navigation"
import { fetchNoteById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

type Props = {
    id: string
}

const NotePreviewClient = ({ id }: Props) => {
    const router = useRouter()

    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })

    const handleClose = () => router.back()

    if (isLoading) {
        return (
            <Modal onClose={handleClose}>
                <p>Loading...</p>
            </Modal>
        )
    }

    if (isError || !note) {
        return (
            <Modal onClose={handleClose}>
                <p>Could not load note.</p>
            </Modal>
        )
    }

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2 className={css.h2}>{note.title}</h2>
                        <button type="button" className={css.backBtn} onClick={handleClose}>Back</button>
                    </div>
                    <p>{note.content}</p>
                    <p>{note.createdAt}</p>
                    <p>{note.tag}</p>
                </div>
            </div>
        </Modal>
    )
}

export default NotePreviewClient