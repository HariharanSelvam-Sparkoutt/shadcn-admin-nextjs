// app/clerk/layout.tsx
'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function ClerkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/clerk/sign-in"
      signInUrl="/clerk/sign-in"
      signUpUrl="/clerk/sign-up"
    >
      {children}
    </ClerkProvider>
  )
}