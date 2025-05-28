"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Mail,
  ChevronDown,
  Download,
  RefreshCw,
  UserCheck,
  UserX,
  Crown,
  UserPlus,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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

const UserAccess = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [selectedRows, setSelectedRows] = useState(new Set())

  const itemsPerPage = 10

  // Mock user data (removed permissions and department)
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "admin",
      phone: "+1 (555) 123-4567",
      is_active: true,
      last_login: "2025-01-28T10:30:00.000000Z",
      created_at: "2024-01-15T09:00:00.000000Z",
      notes: "System administrator with full access",
      business_name: "Tech Solutions Inc",
      cac_reg_no: "RC123456",
      address: "123 Tech Street, Silicon Valley, CA",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "manager",
      phone: "+1 (555) 234-5678",
      is_active: true,
      last_login: "2025-01-28T14:15:00.000000Z",
      created_at: "2024-02-20T11:30:00.000000Z",
      notes: "Sales team manager",
      business_name: "Sales Pro Ltd",
      cac_reg_no: "RC234567",
      address: "456 Business Ave, New York, NY",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "user",
      phone: "+1 (555) 345-6789",
      is_active: true,
      last_login: "2025-01-27T16:45:00.000000Z",
      created_at: "2024-03-10T14:20:00.000000Z",
      notes: "Marketing specialist",
      business_name: "Creative Marketing Co",
      cac_reg_no: "RC345678",
      address: "789 Creative Blvd, Los Angeles, CA",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      role: "viewer",
      phone: "+1 (555) 456-7890",
      is_active: false,
      last_login: "2025-01-20T09:30:00.000000Z",
      created_at: "2024-04-05T10:15:00.000000Z",
      notes: "HR coordinator - currently on leave",
      business_name: "HR Solutions",
      cac_reg_no: "RC456789",
      address: "321 HR Plaza, Chicago, IL",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@company.com",
      role: "manager",
      phone: "+1 (555) 567-8901",
      is_active: true,
      last_login: "2025-01-28T11:20:00.000000Z",
      created_at: "2024-05-12T13:45:00.000000Z",
      notes: "Finance department head",
      business_name: "Finance Corp",
      cac_reg_no: "RC567890",
      address: "654 Finance St, Boston, MA",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "user",
      phone: "+1 (555) 678-9012",
      is_active: true,
      last_login: "2025-01-28T15:10:00.000000Z",
      created_at: "2024-06-18T08:30:00.000000Z",
      notes: "Operations coordinator",
      business_name: "Operations Plus",
      cac_reg_no: "RC678901",
      address: "987 Operations Way, Seattle, WA",
    },
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.business_name && user.business_name.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesRole = filterRole === "all" || user.role === filterRole
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && user.is_active) ||
        (filterStatus === "inactive" && !user.is_active)

      return matchesSearch && matchesRole && matchesStatus
    })

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "last_login" || sortBy === "created_at") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [searchTerm, filterRole, filterStatus, sortBy, sortOrder, users])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleView = (user) => {
    navigate(`/admin/users/${user.id}`)
  }

  const handleEdit = (user) => {
    navigate(`/admin/users/${user.id}/edit`)
  }

  const handleDelete = (userId) => {
    setTimeout(() => setDeleteUserId(userId), 0)
  }

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== deleteUserId))
    setTimeout(() => setDeleteUserId(null), 100)
  }

  const handleSelectRow = (userId) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === currentUsers.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentUsers.map((user) => user.id)))
    }
  }

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: "bg-red-100 text-red-800", icon: Crown },
      manager: { color: "bg-blue-100 text-blue-800", icon: Shield },
      user: { color: "bg-green-100 text-green-800", icon: Users },
      viewer: { color: "bg-gray-100 text-gray-800", icon: Eye },
    }

    const config = roleConfig[role] || roleConfig.user
    const IconComponent = config.icon

    return (
      <Badge variant="secondary" className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <UserCheck className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        <UserX className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">User Access Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage user accounts and roles ({filteredUsers.length} total users)
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Button variant="outline" onClick={handleRefresh} className="w-full sm:w-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate("/admin/create-user")} className="w-full sm:w-auto">
            <UserPlus className="w-4 h-4 mr-2" />
            Create New User
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search users, emails, businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="email">Sort by Email</SelectItem>
                <SelectItem value="role">Sort by Role</SelectItem>
                <SelectItem value="business_name">Sort by Business</SelectItem>
                <SelectItem value="last_login">Sort by Last Login</SelectItem>
                <SelectItem value="created_at">Sort by Created Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? "↑" : "↓"}
            </Button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="role-filter" className="text-sm font-medium">
                  Role
                </Label>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status-filter" className="text-sm font-medium">
                  Status
                </Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">{selectedRows.size} users selected</span>
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm">
                Delete Selected
              </Button>
              <Button variant="outline" size="sm">
                Deactivate Selected
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-3 sm:px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedRows.size === currentUsers.length && currentUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                  User
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Role
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                  Business
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                  Last Login
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`${selectedRows.has(user.id) ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-3 sm:px-6 py-4">
                    <Checkbox checked={selectedRows.has(user.id)} onCheckedChange={() => handleSelectRow(user.id)} />
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="truncate max-w-[150px] sm:max-w-none">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 truncate max-w-[100px] block">
                      {user.business_name || "N/A"}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{getStatusBadge(user.is_active)}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {user.last_login ? formatDate(user.last_login) : "Never"}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="hidden sm:inline">Actions</span>
                          <ChevronDown className="w-4 h-4 sm:ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600">
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

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(endIndex, filteredUsers.length)}</span> of{" "}
                  <span className="font-medium">{filteredUsers.length}</span> results
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
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteUserId}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => setDeleteUserId(null), 100)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone and will remove all associated
              data.
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

export default UserAccess
