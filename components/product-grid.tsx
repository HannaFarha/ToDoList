"use client"

import { useState } from "react"
import Image from "next/image"
import { Grid3X3, UserSquare2 } from "lucide-react"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import { ProductModal } from "@/components/product-modal"

export function ProductGrid() {
  const [activeTab, setActiveTab] = useState<"grid" | "tagged">("grid")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      {/* Tab Bar */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("grid")}
          className={`flex-1 flex justify-center py-3 transition-colors ${
            activeTab === "grid"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground"
          }`}
          aria-label="Grid view"
        >
          <Grid3X3 className="size-5" />
        </button>
        <button
          onClick={() => setActiveTab("tagged")}
          className={`flex-1 flex justify-center py-3 transition-colors ${
            activeTab === "tagged"
              ? "border-b-2 border-foreground text-foreground"
              : "text-muted-foreground"
          }`}
          aria-label="Tagged posts"
        >
          <UserSquare2 className="size-5" />
        </button>
      </div>

      {/* Product Grid */}
      {activeTab === "grid" ? (
        <div className="grid grid-cols-3 gap-px bg-border">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="relative aspect-square overflow-hidden bg-surface group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Image
                src={product.images[0]}
                alt={product.titleAr}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 33vw, 200px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-center opacity-0 group-hover:opacity-100">
                <div className="p-2 text-center w-full">
                  <p className="text-[11px] font-semibold text-foreground truncate" dir="rtl">
                    {product.titleAr}
                  </p>
                  <p className="text-[10px] text-gold font-bold">{product.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <UserSquare2 className="size-16 mb-3 opacity-40" />
          <p className="text-sm" dir="rtl">{"لا توجد منشورات موسومة"}</p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
