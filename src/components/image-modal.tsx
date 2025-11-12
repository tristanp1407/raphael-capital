"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  blurDataURL?: string
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  blurDataURL,
}: ImageModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 mx-4 max-h-[90vh] max-w-[90vw]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -right-4 -top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-rc-navy shadow-lg transition-all hover:scale-110 hover:bg-rc-navy hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative overflow-hidden rounded-lg bg-white shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1920}
                height={1080}
                className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
                quality={95}
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
