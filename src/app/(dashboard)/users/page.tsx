'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from '@/app/(dashboard)/users/components/users-provider'
import { UsersTable } from '@/app/(dashboard)/users/components/users-table'
import { users } from '@/app/(dashboard)/users/data/users'

export default function UsersPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Instead of TanStack search, we can turn searchParams into an object
  const search = Object.fromEntries(searchParams.entries())

  // Instead of route.navigate(), we use Next.js router.push
  const navigate = (path: string) => {
    router.push(path)
  }

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
            <p className="text-muted-foreground">
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          {/* <UsersTable data={users} search={search} navigate={navigate} /> */}
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
