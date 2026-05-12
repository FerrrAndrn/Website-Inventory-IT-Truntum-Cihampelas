export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import FbTable from '@/components/FbTable'
import FadeIn from '@/components/FadeIn'

export default async function FbPage() {
  const { data, error } = await supabase
    .from('fb_equipment')
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
            F&B EQUIPMENT INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <FbTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
