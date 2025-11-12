"use client"

import { useState } from "react"
import Image from "next/image"
import ImageModal from "./image-modal"

interface ExpandableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  blurDataURL?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
}

export default function ExpandableImage({
  src,
  alt,
  width,
  height,
  className = "",
  blurDataURL,
  fill = false,
  sizes,
  priority = false,
  quality,
}: ExpandableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Image Container */}
      <div
        className="group relative cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The Image */}
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={className}
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            sizes={sizes}
            priority={priority}
            quality={quality}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            sizes={sizes}
            priority={priority}
            quality={quality}
          />
        )}

        {/* Hover Overlay - Desktop only */}
        <div
          className={`absolute inset-0 hidden items-center justify-center bg-black/0 transition-all duration-300 lg:flex ${
            isHovered ? "bg-black/20" : ""
          }`}
        >
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition-all duration-300 ${
              isHovered ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-rc-navy"
            >
              {/* Expand icon */}
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        </div>

        {/* Mobile Icon - Always visible on mobile */}
        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-sm lg:hidden">
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
            className="text-rc-navy"
          >
            {/* Expand icon */}
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={src}
        imageAlt={alt}
        blurDataURL={blurDataURL}
      />
    </>
  )
}
