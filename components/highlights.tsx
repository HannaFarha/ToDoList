"use client"

import { Truck, ShoppingBasket, Heart, Gift } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Highlight {
  icon: LucideIcon
  label: string
}

const highlights: Highlight[] = [
  { icon: Gift, label: "تريند" },
  { icon: Heart, label: "آراء الزبائن" },
  { icon: ShoppingBasket, label: "كيفية الطلب" },
  { icon: Truck, label: "الشحن والتوصيل" },
]

export function Highlights() {
  return (
    <section className="py-3 px-4" dir="rtl">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            {/* Circular icon with gold gradient border */}
            <div className="size-[72px] rounded-full p-[2px] bg-gradient-to-br from-gold-light via-gold to-gold-dark">
              <div className="size-full rounded-full bg-surface flex items-center justify-center">
                <item.icon className="size-7 text-gold" strokeWidth={1.5} />
              </div>
            </div>
            <span className="text-[11px] text-foreground whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
