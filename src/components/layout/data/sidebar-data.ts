import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Next.js + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          href: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Tasks',
          href: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Apps',
          href: '/apps',
          icon: Package,
        },
        {
          title: 'Chats',
          href : '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          href: '/users',
          icon: Users,
        },
        {
          title: 'Secured by Clerk',
          icon: ClerkLogo,
          items: [
            {
              title: 'Sign In',
              href: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              href: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              href: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: ShieldCheck,
          items: [
            {
              title: 'Sign In',
              href: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              href: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              href: '/sign-up',
            },
            {
              title: 'Forgot Password',
              href: '/forgot-password',
            },
            {
              title: 'OTP',
              href: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              href: '/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              href: '/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'Not Found',
              href: '/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Internal Server Error',
              href: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Maintenance Error',
              href: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              href: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              href: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              href: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              href: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              href: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          href: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
