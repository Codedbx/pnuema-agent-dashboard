"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Shield,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Eye,
  Calendar,
  RefreshCw,
  ChevronDown,
  Download,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Badge } from "@/components/ui/badge"

const RoleManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [deleteRoleId, setDeleteRoleId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [showMobileOptions, setShowMobileOptions] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample data
 const [roles, setRoles] = useState([
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all permissions", // Add this field
    guardName: "web",
    permissionCount: 88,
    userCount: 2,
    color: "bg-red-100 text-red-800",
    createdAt: "2024-01-15",
    updatedAt: "Feb 11, 2025 01:03:11",
    status: "active",
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access with limited permissions", // Add this field
    guardName: "web", 
    permissionCount: 10,
    userCount: 5,
    color: "bg-blue-100 text-blue-800",
    createdAt: "2024-01-20",
    updatedAt: "Jan 12, 2025 23:52:55",
    status: "active",
  },
  {
    id: 3,
    name: "Customer Service",
    description: "Customer support and service management", // Add this field
    guardName: "web",
    permissionCount: 4,
    userCount: 8,
    color: "bg-purple-100 text-purple-800",
    createdAt: "2024-02-10",
    updatedAt: "Jan 12, 2025 23:52:55",
    status: "active",
  },
  {
    id: 4,
    name: "User",
    description: "Basic user access with minimal permissions", // Add this field
    guardName: "web",
    permissionCount: 0,
    userCount: 15,
    color: "bg-green-100 text-green-800",
    createdAt: "2024-02-01",
    updatedAt: "Jan 12, 2025 23:52:55",
    status: "active",
  },
])


  const [filteredRoles, setFilteredRoles] = useState(roles)

  // Filter and sort roles whenever dependencies change
  useEffect(() => {
  const filtered = roles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    if (filterStatus === "active") return matchesSearch && role.status === "active"
    if (filterStatus === "inactive") return matchesSearch && role.status === "inactive"
    if (filterStatus === "high-users") return matchesSearch && role.userCount >= 10
    if (filterStatus === "low-users") return matchesSearch && role.userCount < 10

    return matchesSearch
  })

  // Sort roles
  filtered.sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (sortBy === "userCount") {
      aValue = Number(aValue)
      bValue = Number(bValue)
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  setFilteredRoles(filtered)
  setCurrentPage(1) // Add this line to reset to page 1
}, [searchTerm, filterStatus, sortBy, sortOrder, roles])

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRoles = filteredRoles.slice(startIndex, endIndex)

  const handleDeleteRole = (roleId) => {
    setDeleteRoleId(roleId)
  }

  const confirmDelete = () => {
    setRoles(roles.filter((role) => role.id !== deleteRoleId))
    setDeleteRoleId(null)
  }

  const handleRefresh = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Reset any filters and reload data
      setSearchTerm("")
      setFilterStatus("all")
      setSortBy("name")
      setSortOrder("asc")
      setSelectedRows(new Set())
      setLoading(false)
    }, 1000)
  }

  const handleViewRole = (roleId) => {
    navigate(`/admin/roles/${roleId}`)
  }

  const handleEditRole = (roleId) => {
    navigate(`/admin/roles/${roleId}/edit`)
  }

  const handleCreateRole = () => {
    navigate("/admin/roles/create")
  }

  const handleSelectRow = (roleId) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(roleId)) {
      newSelected.delete(roleId)
    } else {
      newSelected.add(roleId)
    }
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
  if (selectedRows.size === currentRoles.length) {
    setSelectedRows(new Set())
  } else {
    setSelectedRows(new Set(currentRoles.map((role) => role.id)))
  }
}

  const handleBulkDelete = () => {
    setRoles(roles.filter((role) => !selectedRows.has(role.id)))
    setSelectedRows(new Set())
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Loading roles...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Role Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage user roles ({filteredRoles.length} total roles)</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="sm"
            className="sm:hidden"
            onClick={() => setShowMobileOptions(!showMobileOptions)}
          >
            <Menu className="h-4 w-4 mr-2" />
            Options
          </Button>

          {/* Desktop buttons / Mobile dropdown */}
          <div
            className={`${showMobileOptions ? "flex" : "hidden"} flex-col w-full space-y-2 sm:flex sm:flex-row sm:w-auto sm:space-y-0 sm:space-x-3`}
          >
            <Button onClick={handleCreateRole} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowFilters(!showFilters)}>
                  {showFilters ? "Hide" : "Show"} Advanced Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="userCount">Sort by User Count</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
                <SelectItem value="createdAt">Sort by Created Date</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full sm:w-auto"
            >
              {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
            </Button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status-filter" className="text-sm font-medium">
                  Status
                </Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                    <SelectItem value="high-users">High User Count (10+)</SelectItem>
                    <SelectItem value="low-users">Low User Count (&lt;10)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedRows.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <span className="text-sm font-medium text-blue-900">{selectedRows.size} roles selected</span>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button variant="destructive" size="sm" className="w-full sm:w-auto" onClick={handleBulkDelete}>
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Roles Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
  <tr>
    <th className="w-12 px-3 sm:px-6 py-3 text-left">
      <Checkbox
        checked={selectedRows.size === currentRoles.length && currentRoles.length > 0}
        onCheckedChange={handleSelectAll}
      />
    </th>
    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Role
    </th>
    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Guard Name
    </th>
    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Permissions
    </th>
    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Users
    </th>
    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Updated At
    </th>
    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
      Actions
    </th>
  </tr>
</thead>
            <tbody className="bg-white divide-y divide-gray-200">
  {currentRoles.map((role) => (
    <tr
      key={role.id}
      className={`${selectedRows.has(role.id) ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
    >
      <td className="px-3 sm:px-6 py-4">
        <Checkbox checked={selectedRows.has(role.id)} onCheckedChange={() => handleSelectRow(role.id)} />
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{role.name}</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-xs">
            {role.description}
          </div>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
          {role.guardName}
        </Badge>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
          <Shield className="w-3 h-3 mr-1" />
          {role.permissionCount}
        </Badge>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <Badge variant="secondary" className="text-xs">
          <Users className="w-3 h-3 mr-1" />
          {role.userCount}
        </Badge>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-blue-500 mr-2" />
          <span className="text-xs sm:text-sm">{role.updatedAt}</span>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-4">
              <span className="hidden sm:inline">Actions</span>
              <ChevronDown className="w-4 h-4 sm:ml-1" />
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

      {totalPages > 1 && (
  <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 sm:px-6">
    <div className="flex flex-1 justify-between w-full sm:hidden">
      <Button
        variant="outline"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-24"
      >
        Previous
      </Button>
      <div className="flex items-center justify-center px-4">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <Button
        variant="outline"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-24"
      >
        Next
      </Button>
    </div>
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">{Math.min(endIndex, filteredRoles.length)}</span> of{" "}
          <span className="font-medium">{filteredRoles.length}</span> results
        </p>
      </div>
      <div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            )
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </nav>
      </div>
    </div>
  </div>
)}


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
          <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
  <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
  <AlertDialogAction onClick={confirmDelete} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
    Delete
  </AlertDialogAction>
</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RoleManagement
