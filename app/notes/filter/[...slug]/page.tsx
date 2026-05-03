import { dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
import css from "./NotesClient.module.css"
import { fetchNotes } from "@/lib/api"
import NoteClient from "./Notes.client"
import { Metadata } from "next"

type Props = {
    params: Promise<{slug:string[]}>
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
    const { slug } = await params
    const tag = slug[0] ?? "all"
    return {
        title:`Notes: ${tag}`,
        description:`Browse ${tag} notes in NoteHub.`,
        openGraph:{
            title:`Note${tag}`,
            description:`Browse ${tag} notes in NoteHub.`,
            url: process.env.NEXT_PUBLIC_APP_URL ?? `http://localhost:3000/${tag}`,
            images:[{
                url:"https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 600,
                alt: `${tag}`,

            }],
        }
    }
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