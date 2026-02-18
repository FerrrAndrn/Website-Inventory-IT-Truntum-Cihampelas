export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import SDBTable from '@/components/SDBTable'
import FadeIn from '@/components/FadeIn'

export default async function SDBPage() {
  const { data, error } = await supabase
    .from('safe_deposit_box')
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
            SAFE DEPOSIT BOX INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <SDBTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
