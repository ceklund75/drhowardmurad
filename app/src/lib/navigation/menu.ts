import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_PRIMARY_MENU } from '../graphql/queries'

type MenuItemNode = {
  cssClasses?: string | string[] | null
  id: string
  parentId: string | null
  label: string
  url: string
  path?: string | null
}

type MenuQuery = {
  menuItems: { nodes: MenuItemNode[] }
}

export type NavItem = {
  cssClasses?: string | string[] | null
  id: string
  label: string
  href: string
  children: NavItem[]
}

function toRelativeHref(node: MenuItemNode): string {
  if (node.path) return node.path
  try {
    return new URL(node.url).pathname
  } catch {
    return node.url
  }
}

function buildTree(nodes: MenuItemNode[]): NavItem[] {
  const byId = new Map<string, NavItem>()
  const roots: NavItem[] = []

  for (const n of nodes) {
    byId.set(n.id, {
      id: n.id,
      label: n.label,
      href: toRelativeHref(n),
      cssClasses: n.cssClasses || undefined, // add this line
      children: [],
    })
  }

  for (const n of nodes) {
    const item = byId.get(n.id)!
    if (n.parentId && byId.has(n.parentId)) byId.get(n.parentId)!.children.push(item)
    else roots.push(item)
  }

  return roots
}

export async function getPrimaryMenu(location: string = 'PRIMARY'): Promise<NavItem[]> {
  const query = QUERY_PRIMARY_MENU

  const data = await wpgraphql<MenuQuery>({
    query,
    variables: { location },
    revalidate: 2592000,
  })
  return buildTree(data.menuItems.nodes)
}
