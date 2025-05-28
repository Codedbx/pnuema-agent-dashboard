"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Plus, Search, Filter, MoreVertical, Edit, Trash2, Users, Eye, Calendar, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const RoleManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteRoleId, setDeleteRoleId] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sample data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      color: "bg-red-100 text-red-800",
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Admin",
      description: "Administrative access with most permissions",
      userCount: 5,
      color: "bg-blue-100 text-blue-800",
      createdAt: "2024-01-20",
      status: "active",
    },
    {
      id: 3,
      name: "Agent",
      description: "Travel agent with booking and customer management",
      userCount: 15,
      color: "bg-green-100 text-green-800",
      createdAt: "2024-02-01",
      status: "active",
    },
    {
      id: 4,
      name: "Customer Support",
      description: "Customer service representative with limited access",
      userCount: 8,
      color: "bg-purple-100 text-purple-800",
      createdAt: "2024-02-10",
      status: "active",
    },
    {
      id: 5,
      name: "Viewer",
      description: "Read-only access for reporting and analytics",
      userCount: 3,
      color: "bg-gray-100 text-gray-800",
      createdAt: "2024-02-15",
      status: "inactive",
    },
  ])

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteRole = (roleId) => {
    setDeleteRoleId(roleId)
  }

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== deleteRoleId))
    setDeleteRoleId(null)
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  const handleViewRole = (roleId) => {
    navigate(`/admin/roles/${roleId}`)
  }

  const handleEditRole = (roleId) => {
    navigate(`/admin/roles/${roleId}/edit`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Role Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage user roles ({filteredRoles.length} total roles)</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Button variant="outline" onClick={handleRefresh} className="w-full sm:w-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => navigate("/admin/roles/create")} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                  Role
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                  Description
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Users
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                  Created
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${role.color} rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0`}
                      >
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{role.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-[150px] sm:max-w-xs truncate">{role.description}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{role.userCount}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        role.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 hidden sm:block" />
                      <span className="text-xs sm:text-sm">{role.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="hidden sm:inline">Actions</span>
                          <MoreVertical className="w-4 h-4 sm:ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewRole(role.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditRole(role.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteRole(role.id)} className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteRoleId}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => setDeleteRoleId(null), 100)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be undone and may affect users assigned to
              this role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RoleManagement
