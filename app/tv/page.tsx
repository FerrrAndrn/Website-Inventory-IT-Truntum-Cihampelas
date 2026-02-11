export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import SmartTVTable from '@/components/SmartTVTable'
import FadeIn from '@/components/FadeIn'

export default async function SmartTVPage() {
  const { data, error } = await supabase
    .from('smart_tv')
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
            SMART TV INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <SmartTVTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
