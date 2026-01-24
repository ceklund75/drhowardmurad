// src/components/ui/Button.tsx
import * as React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'h-12.5 px-8 py-4.5', // if you want exact spec; adjust as needed
        'border-theme bg-theme text-theme-contrast border',
        'text-button font-medium tracking-wide uppercase',
        'hover:text-theme hover:bg-transparent',
        'transition-colors',
        className,
      ].join(' ')}
    />
  )
}
