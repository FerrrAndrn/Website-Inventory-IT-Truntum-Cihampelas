export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import FadeIn from '@/components/FadeIn'
import ITTable from '@/components/ITTable'

export default async function ITPage() {
  const { data, error } = await supabase
    .from('it_equipment')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(error)
    return (
      <main className="main-container">
        <div className="content">Gagal mengambil data</div>
      </main>
    )
  }

  return (
    <main className="main-container">

      <FadeIn>
        <div className="page-title">
          <h1 className="title-gradient-gold">
            IT EQUIPMENT INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <ITTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
