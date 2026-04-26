import { dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
import css from "./NotesClient.module.css"
import { fetchNotes } from "@/lib/api"
import NoteClient from "./Notes.client"

type Props = {
    params: Promise<{slug:string[]}>
}

const Notes = async ({params}:Props) => {

    const { slug } = await params
    const tag = slug[0] 

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", tag],
        queryFn: () =>  fetchNotes("", 1, tag),
    })


    return(
        
         <div className={css.app}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteClient tag={tag}/>
            </HydrationBoundary>
      
        </div>
        
    )
}

export default Notes