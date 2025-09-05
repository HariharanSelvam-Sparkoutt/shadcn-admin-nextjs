"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ConfigDrawer } from "@/components/config-drawer";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UsersProvider } from "@/app/(dashboard)/users/components/users-provider";
import { UsersTable } from "@/app/(dashboard)/users/components/users-table";
import { users } from "@/app/(dashboard)/users/data/users";
import { type NavigateFn } from "@/hooks/use-table-url-state";

export default function UsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = Object.fromEntries(searchParams.entries());

  const navigate: NavigateFn = (opts) => {
    let newSearch: Record<string, string>;

    if (opts.search === true) {
      newSearch = {};
    } else if (typeof opts.search === "function") {
      const result = opts.search(search);
      newSearch = Object.fromEntries(
        Object.entries(result).map(([key, value]) => [
          key,
          value === null || value === undefined ? "" : String(value),
        ])
      );
    } else {
      newSearch = Object.fromEntries(
        Object.entries(opts.search).map(([key, value]) => [
          key,
          value === null || value === undefined ? "" : String(value),
        ])
      );
    }

    const filteredSearch = Object.fromEntries(
      Object.entries(newSearch).filter(([_, value]) => value !== "")
    );

    const query = new URLSearchParams(filteredSearch).toString();
    const url = `${pathname}${query ? `?${query}` : ""}`;

    if (opts.replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

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
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
}
