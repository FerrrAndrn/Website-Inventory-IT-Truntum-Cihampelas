export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import TelephoneTable from '@/components/TelephoneTable'
import FadeIn from '@/components/FadeIn'

export default async function TelephonePage() {
  const { data, error } = await supabase
    .from('telephone')
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
            TELEPHONE INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <TelephoneTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
