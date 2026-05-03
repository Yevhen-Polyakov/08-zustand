"use client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetchNotes } from "../../../../lib/api"
import { useDebouncedCallback } from "use-debounce"
import SearchBox from "../../../../components/SearchBox/SearchBox"
import Pagination from "../../../../components/Pagination/Pagination"
import css from "./NotesClient.module.css"
import NoteList from "../../../../components/NoteList/NoteList"
import ErrorMessage from "@/app/notes/filter/[...slug]/error"
import Link from "next/link"


type NotesClientProps = {
    tag: string;
}

const NotesClient = ({tag}:NotesClientProps) => {
    const [query, setQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
   

    const {data, error, isError} = useQuery({
        queryKey:["notes", query, currentPage, tag],
        queryFn: () => fetchNotes(query, tag, currentPage),
        placeholderData: keepPreviousData,
  })

  const notes = data?.notes || [] 
  const totalPage = data?.totalPages || 0

  const searchQuery = useDebouncedCallback(
        (value:string) => {
            setQuery(value)
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
            
                <Link 
                    className={css.button}
                    href="/notes/action/create"
                    >Create note +
                </Link>
                         
                
        </div>

        <div>
            {isError && <ErrorMessage error={error}/>}
            {notes.length > 0 && <NoteList notes={notes}/>}
        </div>
        </>
        
    )
}

export default NotesClient