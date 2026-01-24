import Link from "next/link";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { getPrimaryMenu } from "@/lib/navigation/menu";

export async function Header() {
  const items = await getPrimaryMenu();

  return (
    <HeaderShell>
        <div className="mx-auto max-w-[1200px] px-6">
          <div
            className={[
              "flex items-center justify-between",
              "h-[102px] transition-[height] duration-200",
              // shrink:
              "group-data-[shrunk=true]:h-[64px]",
            ].join(" ")}
          >
            <Link href="/" aria-label="Dr. Howard Murad" className="shrink-0 block w-[274px]">
                <img
                    src="/images/dhm-logo-signature.svg"
                    alt="Dr. Howard Murad"
                    className="h-[84px] w-auto group-data-[shrunk=true]:h-[64px] transition-[height] duration-200"
                />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {items.map((item) => (
                  <li key={item.id} className="relative group">
                    <Link
                      href={item.href}
                      className="text-menu font-medium uppercase tracking-wide text-white hover:text-gold transition-colors"
                    >
                      {item.label}
                    </Link>

                    {item.children.length > 0 && (
                      <div className="invisible absolute left-0 top-full mt-2 min-w-[220px] bg-white opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                        <ul className="py-2">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-body text-dark-2 hover:text-link-hover transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
    </HeaderShell>
  );
}
