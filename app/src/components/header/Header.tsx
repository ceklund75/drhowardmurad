import { getPrimaryMenu } from '@/lib/navigation/menu'
import { HeaderClient } from './HeaderClient'

export async function Header() {
  const items = await getPrimaryMenu()
  return <HeaderClient items={items} />
}
