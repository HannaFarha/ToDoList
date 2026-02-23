import { ProfileHeader } from "@/components/profile-header"
import { ProfileInfo } from "@/components/profile-info"
import { Highlights } from "@/components/highlights"
import { ProductGrid } from "@/components/product-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background max-w-lg mx-auto">
      <ProfileHeader />
      <ProfileInfo />
      <Highlights />
      <ProductGrid />
    </main>
  )
}
