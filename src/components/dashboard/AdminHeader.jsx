"use client"

import { useState } from "react"
import { Search, Bell, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const AdminHeader = () => {
  const [searchValue, setSearchValue] = useState("")

  const notifications = [
    {
      id: 1,
      user: "John Doe",
      action: "just booked your...",
      time: "25 minutes ago",
      avatar: null,
    },
    {
      id: 2,
      user: "John Doe",
      action: "just booked your...",
      time: "45 minutes ago",
      avatar: null,
    },
    {
      id: 3,
      user: "John Doe",
      action: "just booked your...",
      time: "59 minutes ago",
      avatar: null,
    },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left side - Mobile menu trigger and breadcrumb */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Mobile sidebar trigger */}
          <SidebarTrigger className="md:hidden" />

          {/* Breadcrumb Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-2 text-sm">
            <button className="text-gray-500 hover:text-gray-700">Dashboards</button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Default</span>
          </div>
        </div>

        {/* Right side - Search and Notifications */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search - Responsive width */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-4 w-48 lg:w-64 text-sm"
            />
            {searchValue && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>

          {/* Mobile search button */}
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-4 border-b border-gray-100">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{notification.user}</span>{" "}
                          <span className="text-gray-600">{notification.action}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-gray-600" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
