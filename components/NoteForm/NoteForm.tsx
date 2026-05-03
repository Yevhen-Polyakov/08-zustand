"use client"
import css from './NoteForm.module.css'
import { useId, useState } from 'react'
import * as Yup from "yup"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'
import { NewNote, NoteTag } from '@/types/note'
import { useRouter } from 'next/navigation'
import { useNoteDraftStore } from '@/lib/store/noteStore'

const OrderFormSchema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required("Title is required"),
    content: Yup.string().max(500),
    tag: Yup.string().required("Tag is required"),
})

type Props = {
    categories: NoteTag[];
}

const NoteForm = ({ categories }: Props) => {

    const router = useRouter()
    const queryClient = useQueryClient()
    const fieldId = useId()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const { draft, setDraft, clearDraft} = useNoteDraftStore()

    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.push('/notes/filter/all')
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [e.target.name]: e.target.value
        })
    }

    const handleCancel = () =>
        router.push("/notes/filter/all")

    const handleSubmit = (formData: FormData) => {
        const value = Object.fromEntries(formData) as NewNote

        try {
            OrderFormSchema.validateSync(value, { abortEarly: false })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const fieldErrors: Record<string, string> = {}
                err.inner.forEach(e => {
                    if (e.path) fieldErrors[e.path] = e.message
                })
                setErrors(fieldErrors)
                return
            }
        }

        setErrors({})
        mutate(value)
    }

    return(
        
        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input 
                    id={`${fieldId}-title`} 
                    type="text" name="title" 
                    className={css.input}
                    defaultValue={draft?.title}
                    onChange={handleChange} />
                {errors.title && <span className={css.error}>{errors.title}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    defaultValue={draft?.content}
                    onChange={handleChange}>
                </textarea>
                {errors.content && <span className={css.error}>{errors.content}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select 
                    id={`${fieldId}-tag`} 
                    name="tag" 
                    className={css.select}
                    defaultValue={draft?.tag}
                    onChange={handleChange}>
                    {categories.map((category) => (
                        <option key={String(category)} value={category}>{category}</option>
                    ))}
                </select>
                {errors.tag && <span className={css.error}>{errors.tag}</span>}
            </div>

            <div className={css.actions}>
                <button
                    onClick={handleCancel}
                    type="button"
                    className={css.cancelButton}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isPending}>
                    Create note
                </button>
            </div>
        </form>

        

    )
}

export default NoteForm