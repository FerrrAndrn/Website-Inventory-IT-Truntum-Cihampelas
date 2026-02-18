export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import PrinterTable from '@/components/PrinterTable'
import FadeIn from '@/components/FadeIn'

export default async function PrinterPage() {
  const { data, error } = await supabase
    .from('printer')
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
            PRINTER INVENTORY
          </h1>
          <p className="title-gradient-gold">
            TRUNTUM CIHAMPELAS
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <PrinterTable initialData={data ?? []} />
      </FadeIn>

    </main>
  )
}
