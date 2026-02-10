export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabaseClient'
import AssetTable from '@/components/AssetTable'

export default async function Home() {
  const { data, error } = await supabase
    .from('assettuci')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className="container">
      <header className="page-header">
        <h1>ASSET INVENTORY</h1>
        <h2>TRUNTUM CIHAMPELAS</h2>
      </header>

      <AssetTable initialData={data ?? []} />
    </main>
  )
}
