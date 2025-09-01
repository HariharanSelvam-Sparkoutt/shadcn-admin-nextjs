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
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { users } from './data/users'
import { type NavigateFn } from '@/hooks/use-table-url-state'

export default function UsersPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = Object.fromEntries(searchParams.entries())

  // Create a navigate function that matches NavigateFn signature
  const navigate: NavigateFn = (opts) => {
    const urlSearchParams = new URLSearchParams()
    
    // Handle different types of search options
    if (opts.search === true) {
      // Keep current search params
      searchParams.forEach((value, key) => {
        urlSearchParams.set(key, value)
      })
    } else if (typeof opts.search === 'function') {
      // Apply function to current search params
      const currentSearch = Object.fromEntries(searchParams.entries())
      const newSearch = opts.search(currentSearch)
      Object.entries(newSearch).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlSearchParams.set(key, String(value))
        }
      })
    } else {
      // Set specific search params
      Object.entries(opts.search).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlSearchParams.set(key, String(value))
        }
      })
    }

    const searchString = urlSearchParams.toString()
    const url = searchString ? `${pathname}?${searchString}` : pathname

    if (opts.replace) {
      router.replace(url)
    } else {
      router.push(url)
    }
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
          <UsersTable data={users} search={search} navigate={navigate} />
          Hello
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
