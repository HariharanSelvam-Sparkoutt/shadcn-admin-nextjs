"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard,
  ListTodo,
  Package,
  MessagesSquare,
  Users,
  LogIn,
  UserPlus,
  ChevronDown,
  ShieldCheck,
  UsersIcon,
  Home, 
  CheckSquare, 
  Grid, 
  MessageSquare, 
  Shield,
  FileText,
  AlertTriangle,
  Settings,
  Mail,
  User,
  Bug,
  UserX,
  Lock,
  FileX,
  Construction,
  ServerOff,
  UserRoundCog,
  Wrench,
  Palette,
  Bell,
  Monitor,
  CircleQuestionMark,
} from "lucide-react"
import { useState } from "react"

export function AppSidebar() {
  const [isClerkOpen, setIsClerkOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
            S
          </div>
          <div>
            <h1 className="font-semibold">Shaden Admin</h1>
            <p className="text-xs text-muted-foreground">NextJs + ShadcnUI</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* General Section */}
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/tasks" className="flex items-center gap-2">
                    <ListTodo className="h-4 w-4" />
                    Tasks
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/apps" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Apps
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/chats" className="flex items-center gap-2">
                    <MessagesSquare className="h-4 w-4" />
                    Chats
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/users" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Users
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setIsClerkOpen(!isClerkOpen)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secured by Clerk
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isClerkOpen ? 'rotate-180' : ''}`} 
                  />
                </SidebarMenuButton>
                {isClerkOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in" className="flex items-center gap-2">
                          Sign In
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-up" className="flex items-center gap-2">
                          Sign Up
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/user-management" className="flex items-center gap-2">
                          User Management
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pages Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                  onClick={() => setIsAuthOpen(!isAuthOpen)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Auth
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} 
                  />
                </SidebarMenuButton>
                {isAuthOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in" className="flex items-center gap-2">
                          Sign In
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in-2" className="flex items-center gap-2">
                          Sign In (2 Col)
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-up" className="flex items-center gap-2">
                          Sign Up
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                     <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/forgot-password" className="flex items-center gap-2">
                          Forgot Password
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                     <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/otp" className="flex items-center gap-2">
                          OTP
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              </SidebarMenu>
              
              <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                  onClick={() => setIsErrorOpen(!isErrorOpen)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    Errors
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isErrorOpen ? 'rotate-180' : ''}`} 
                  />
                </SidebarMenuButton>
                {isErrorOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                         Unauthorized
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in-2" className="flex items-center gap-2">
                        <UserX className="h-4 w-4" />
                         Forbidden
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-up" className="flex items-center gap-2">
                        <FileX className="h-4 w-4" />
                          Not Found
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                     <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/forgot-password" className="flex items-center gap-2">
                        <ServerOff className="h-4 w-4" />
                          Internal Server Error
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                     <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/otp" className="flex items-center gap-2">
                        <Construction className="h-4 w-4" />
                          Maintenance Error
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
             <SidebarMenu>
              <SidebarMenuItem>
                 <SidebarMenuButton 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} 
                  />
                </SidebarMenuButton>
                {isSettingsOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in" className="flex items-center gap-2">
                        <UserRoundCog className="h-4 w-4" />
                         Profile
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-in-2" className="flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                         Account
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/sign-up" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                          Appearence
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                     <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/forgot-password" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                          Notifications
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                     <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/otp" className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                          Display
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

               <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/tasks" className="flex items-center gap-2">
                    <CircleQuestionMark className="h-4 w-4" />
                    Help Center
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
            SN
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">satnaing</p>
            <p className="text-xs text-muted-foreground truncate">satnaingdev@gmail.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}