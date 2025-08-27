'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

interface ZoomableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function ZoomableImage({ src, alt, width, height }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const defaultWidth = 800
  const defaultHeight = 450
  const aspectRatio = height && width ? height / width : 9/16

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)} 
        className="cursor-zoom-in transition-transform hover:scale-[1.01] duration-200 max-w-3xl -my-1"
      >
        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={width || defaultWidth}
            height={height || defaultHeight}
            className="rounded-lg w-full h-auto object-contain"
            style={{ aspectRatio: `${width || defaultWidth}/${height || defaultHeight}` }}
          />
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src }]}
        plugins={[Zoom]}
        animation={{ zoom: 300 }}
        zoom={{
          maxZoomPixelRatio: 1.65,
          zoomInMultiplier: 1.25,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          wheelZoomDistanceFactor: 200,
          pinchZoomDistanceFactor: 200,
          scrollToZoom: true
        }}
        carousel={{ finite: true }}
        styles={{
          container: { 
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
          },
          root: { 
            '--yarl__color_backdrop': 'rgba(0, 0, 0, 0.8)',
          },
        }}
        on={{
          click: () => setIsOpen(false)
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  )
}
