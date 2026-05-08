export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import EngtoolTable from '@/components/EngtoolTable'
import FadeIn from '@/components/FadeIn'

export default async function Engtoolpage() {
  const { data, error } = await supabase
    .from('engineering_tool')
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
            ENGINEERING TOOLS INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <EngtoolTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
