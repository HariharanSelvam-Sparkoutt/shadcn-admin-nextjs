'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function UnauthorisedError() {      // TanStack navigate
  const router = useRouter()           // Next.js router (for back)

  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>401</h1>
        <span className='font-medium'>Unauthorized Access</span>
        <p className='text-muted-foreground text-center'>
          Please log in with the appropriate credentials <br /> to access this
          resource.
        </p>
        <div className='mt-6 flex gap-4'>
          {/* Go back using Next.js router */}
          <Button variant='outline' onClick={() => router.back()}>
            Go Back
          </Button>

          {/* Go home using TanStack navigate */}
          <Button onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
