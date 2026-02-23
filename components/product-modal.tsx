"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import type { Product } from "@/lib/products"
import { getWhatsAppLink, products } from "@/lib/products"

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const currentProduct = product
    ? products[currentProductIndex]
    : null

  useEffect(() => {
    if (product) {
      const idx = products.findIndex((p) => p.id === product.id)
      setCurrentProductIndex(idx >= 0 ? idx : 0)
      setCurrentImageIndex(0)
    }
  }, [product])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [product])

  // Keyboard navigation
  useEffect(() => {
    if (!product) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") goToNextProduct()
      if (e.key === "ArrowLeft") goToPrevProduct()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  })

  const goToNextProduct = useCallback(() => {
    setCurrentProductIndex((prev) =>
      prev < products.length - 1 ? prev + 1 : 0
    )
    setCurrentImageIndex(0)
  }, [])

  const goToPrevProduct = useCallback(() => {
    setCurrentProductIndex((prev) =>
      prev > 0 ? prev - 1 : products.length - 1
    )
    setCurrentImageIndex(0)
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isSwipe = Math.abs(distance) > minSwipeDistance
    if (isSwipe) {
      if (distance > 0) {
        goToNextProduct()
      } else {
        goToPrevProduct()
      }
    }
  }

  if (!product || !currentProduct) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={currentProduct.titleAr}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-surface rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 size-8 rounded-full bg-black/50 flex items-center justify-center text-foreground hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        {/* Product Image with Swipe */}
        <div
          className="relative aspect-square bg-background"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image
            src={currentProduct.images[currentImageIndex]}
            alt={currentProduct.titleAr}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
            priority
          />

          {/* Image counter */}
          <div className="absolute top-3 left-3 bg-black/50 text-foreground text-xs px-2 py-1 rounded-full">
            {currentProductIndex + 1} / {products.length}
          </div>

          {/* Swipe navigation arrows (desktop) */}
          <button
            onClick={goToPrevProduct}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 flex items-center justify-center text-foreground hover:bg-black/70 transition-colors hidden sm:flex"
            aria-label="Previous product"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={goToNextProduct}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/50 flex items-center justify-center text-foreground hover:bg-black/70 transition-colors hidden sm:flex"
            aria-label="Next product"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Swipe hint on mobile */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:hidden">
            <span className="text-[10px] text-foreground/70 bg-black/50 px-2 py-0.5 rounded-full">
              {"اسحب للتصفح"}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4" dir="rtl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {currentProduct.titleAr}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {currentProduct.title}
              </p>
            </div>
            <span className="text-lg font-bold text-gold shrink-0">
              {currentProduct.price}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {currentProduct.description}
          </p>

          {/* WhatsApp Order Button */}
          <a
            href={getWhatsAppLink(currentProduct)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="size-5" />
            {"اطلب عبر واتساب"}
          </a>
        </div>
      </div>
    </div>
  )
}
