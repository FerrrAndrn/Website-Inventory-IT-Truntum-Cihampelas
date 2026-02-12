export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import FadeIn from '@/components/FadeIn'
import ComputerTable from '@/components/ComputerTable'

export default async function LaptopPage() {
  const { data, error } = await supabase
    .from('computer')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className="main-container">

      <FadeIn>
        <div className="page-title">
          <h1 className="title-gradient-gold">
            COMPUTER INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ComputerTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
