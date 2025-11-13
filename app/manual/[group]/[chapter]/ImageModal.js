'use client'

import { useState } from 'react'

export default function ImageModal({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div 
        className="manual-image-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="manual-image"
        />
        {isHovered && (
          <div className="manual-image-overlay">
            <span className="manual-image-icon">🔍</span>
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="image-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="image-modal-content">
            <button 
              className="image-modal-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  )
}
