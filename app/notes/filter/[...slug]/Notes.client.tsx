"use client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetchNotes } from "../../../../lib/api"
import { useDebouncedCallback } from "use-debounce"
import SearchBox from "../../../../components/SearchBox/SearchBox"
import Pagination from "../../../../components/Pagination/Pagination"
import css from "./NotesClient.module.css"
import Modal from "../../../../components/Modal/Modal"
import NoteForm from "../../../../components/NoteForm/NoteForm"
import NoteList from "../../../../components/NoteList/NoteList"
import ErrorMessage from "./error"

type NoteClientProps = {
    tag: string;
}

const NoteClient = ({tag}:NoteClientProps) => {
    const [task, setTask] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const {data, error, isError} = useQuery({
        queryKey:["notes", task, currentPage, tag],
        queryFn: () => fetchNotes(task, currentPage, tag),  
        placeholderData: keepPreviousData,
  })

  const notes = data?.notes || [] 
  const totalPage = data?.totalPages || 0

  const searchQuery = useDebouncedCallback(
        (value:string) => {
            setTask(value)
            setCurrentPage(1)
        },300
      )

    return(
        <>
        <div className={css.toolbar}>
            <SearchBox onChange={searchQuery} />
            {totalPage > 1 && (<Pagination
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}/>)}
            
                <button 
                    className={css.button}
                    onClick={() => setIsOpenModal(true)}
                >Create note +

                </button>
                {isOpenModal &&
                <Modal onClose={() => setIsOpenModal(false)}>
                    <NoteForm onClose={() => setIsOpenModal(false)}/>
                </Modal> }
        </div>

        <div>
            {isError && <ErrorMessage error={error}/>}
            {notes.length > 0 && <NoteList notes={notes}/>}
        </div>
        </>
        
    )
}

export default NoteClient