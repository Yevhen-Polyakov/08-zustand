"use client"
import React, { useCallback, useEffect } from 'react'
import css from './Modal.module.css'
import { createPortal } from 'react-dom'

interface ModalProps{
    children: React.ReactNode
    onClose: () => void
}

const Modal = ({ children, onClose }:ModalProps) => {
    const handleClose = useCallback(() => onClose(), [onClose])
    
    useEffect(()=> {
        function handleKeydown(e: KeyboardEvent) {
            if(e.key === "Escape")
              handleClose()  
        }

        document.addEventListener('keydown', handleKeydown)
        document.body.style.overflow = "hidden"

        return() => {
            document.removeEventListener("keydown", handleKeydown)
            document.body.style.overflow = ""
        }
        
    }, [handleClose])

    if (typeof document === 'undefined') {
        return null
    }

    return createPortal(
       <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={() => handleClose()}
        >

            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, 
        document.body
    )
}

export default Modal