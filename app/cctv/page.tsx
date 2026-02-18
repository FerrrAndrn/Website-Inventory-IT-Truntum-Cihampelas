export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import FadeIn from '@/components/FadeIn'
import CCTVTable from '@/components/CCTVTable'

export default async function CCTVPage() {
  const { data, error } = await supabase
    .from('cctv')
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
            CCTV INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <CCTVTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
