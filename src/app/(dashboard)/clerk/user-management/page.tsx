"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SignedIn, useAuth, UserButton } from "@clerk/clerk-react"
import { ExternalLink, Loader2 } from "lucide-react"
import { ClerkLogo } from "@/assets/clerk-logo"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { LearnMore } from "@/components/learn-more"
import { Search } from "@/components/search"
import { ThemeSwitch } from "@/components/theme-switch"
import { UsersDialogs } from "@/features/users/components/users-dialogs"
import { UsersPrimaryButtons } from "@/features/users/components/users-primary-buttons"
import { UsersProvider } from "@/features/users/components/users-provider"
import { UsersTable } from "@/features/users/components/users-table"
import { users } from "@/features/users/data/users"

export default function UserManagementPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const [opened, setOpened] = useState(true)

  if (!isLoaded) {
    return (
      <div className="flex h-svh items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Unauthorized />
  }

  return (
    <SignedIn>
      <UsersProvider>
        <Header fixed>
          <Search />
          <div className="ms-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserButton />
          </div>
        </Header>

        <Main>
          <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">User List</h2>
              <div className="flex gap-1">
                <p className="text-muted-foreground">
                  Manage your users and their roles here.
                </p>
                <LearnMore
                  open={opened}
                  onOpenChange={setOpened}
                  contentProps={{ side: "right" }}
                >
                  <p>
                    This is the same as{" "}
                    <span className="text-blue-500 underline decoration-dashed underline-offset-2">
                      /users
                    </span>
                  </p>

                  <p className="mt-4">
                    You can sign out or manage/delete your account via the User
                    Profile menu in the top-right corner of the page.
                    <ExternalLink className="inline-block size-4" />
                  </p>
                </LearnMore>
              </div>
            </div>
            <UsersPrimaryButtons />
          </div>

          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            {/* Removed TanStack Router props (navigate, search) */}
            <UsersTable data={users} navigate={() => {}} search={{}} />
          </div>
        </Main>

        <UsersDialogs />
      </UsersProvider>
    </SignedIn>
  )
}

const COUNTDOWN = 5

function Unauthorized() {
  const router = useRouter()
  const [opened, setOpened] = useState(true)
  const [cancelled, setCancelled] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN)

  // Countdown logic
  useEffect(() => {
    if (cancelled || opened) return
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [cancelled, opened])

  // Redirect when countdown hits 0
  useEffect(() => {
    if (countdown === 0) {
      router.push("/sign-in")
    }
  }, [countdown, router])

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">401</h1>
        <span className="font-medium">Unauthorized Access</span>
        <p className="text-muted-foreground text-center">
          You must be authenticated via Clerk{" "}
          <sup>
            <LearnMore open={opened} onOpenChange={setOpened}>
              <p>This is the same as /users.</p>
              <p>You must first sign in using Clerk to access this route. </p>
              <p className="mt-4">
                After signing in, you'll be able to sign out or delete your
                account via the User Profile dropdown on this page.
              </p>
            </LearnMore>
          </sup>
          <br />
          to access this resource.
        </p>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push("/sign-in")}>
            <ClerkLogo className="invert" /> Sign in
          </Button>
        </div>

        <div className="mt-4 h-8 text-center">
          {!cancelled && !opened && (
            <>
              <p>
                {countdown > 0
                  ? `Redirecting to Sign In page in ${countdown}s`
                  : `Redirecting...`}
              </p>
              <Button variant="link" onClick={() => setCancelled(true)}>
                Cancel Redirect
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
