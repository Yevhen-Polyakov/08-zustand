"use client"
import React, { useEffect } from 'react'
import css from './Modal.module.css'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

interface ModalProps{
    children: React.ReactNode
}

const Modal = ({ children}:ModalProps) => {
    const router = useRouter()
    
    useEffect(()=> {
        function handleKeydown(e: KeyboardEvent) {
            if(e.key === "Escape")
              router.back()  
        }

        document.addEventListener('keydown', handleKeydown)
        document.body.style.overflow = "hidden"

        return() => {
            document.removeEventListener("keydown", handleKeydown)
            document.body.style.overflow = ""
        }
        
    }, [router])

    if (typeof document === 'undefined') {
        return null
    }

    return createPortal(
       <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={() => router.back()}
        >

            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, 
        document.body
    )
}

export default Modal