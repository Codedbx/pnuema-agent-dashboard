// Activities.tsx
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  MapPin,
  DollarSign,
  ChevronDown,
  Download,
  RefreshCw,
  Menu,
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

const Activities = () => {
  const navigate = useNavigate()
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [deleteActivityId, setDeleteActivityId] = useState(null)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [showMobileOptions, setShowMobileOptions] = useState(false)

  const itemsPerPage = 10

  // Mock API data (simplified without packages)
  const apiData = {
    status: "success",
    data: [
      {
        id: 2,
        title: "Swimming",
        description: "going swimming at the beach",
        price: "600.00",
        location: "Paris, France",
        is_active: true,
        is_featured: true,
        time_slots: [
          {
            id: 1,
            starts_at: "2025-05-25T17:34:32.000000Z",
            ends_at: "2025-05-25T17:34:32.000000Z",
          },
        ],
      },
      {
        id: 1,
        title: "Hiking",
        description: "on the mountains",
        price: "500.00",
        location: "Alaska, USA",
        is_active: true,
        is_featured: false,
        time_slots: [
          {
            id: 3,
            starts_at: "2025-05-28T16:36:10.000000Z",
            ends_at: "2025-05-31T16:36:10.000000Z",
          },
        ],
      },
      {
        id: 4,
        title: "Glacier Hiking",
        description: "Explore stunning glaciers with expert guides",
        price: "750.00",
        location: "Anchorage, Alaska",
        is_active: true,
        is_featured: true,
        time_slots: [
          {
            id: 4,
            starts_at: "2025-08-10T08:00:00.000000Z",
            ends_at: "2025-08-10T16:00:00.000000Z",
          },
        ],
      },
    ],
  }

  useEffect(() => {
    setTimeout(() => {
      const allActivities = apiData.data.map(activity => ({
        ...activity,
        timeSlotCount: activity.time_slots?.length || 0
      }))
      setActivities(allActivities)
      setFilteredActivities(allActivities)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const filtered = activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())

      if (filterStatus === "all") return matchesSearch
      if (filterStatus === "with-slots") return matchesSearch && activity.timeSlotCount > 0
      if (filterStatus === "no-slots") return matchesSearch && activity.timeSlotCount === 0
      if (filterStatus === "active") return matchesSearch && activity.is_active
      if (filterStatus === "featured") return matchesSearch && activity.is_featured

      return matchesSearch
    })

    // Sort activities
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "price") {
        aValue = Number.parseFloat(aValue)
        bValue = Number.parseFloat(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredActivities(filtered)
    setCurrentPage(1)
  }, [searchTerm, filterStatus, sortBy, sortOrder, activities])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

  const handleView = (activity) => {
    navigate(`/admin/activities/${activity.id}`)
  }

  const handleEdit = (activity) => {
    navigate(`/admin/activities/${activity.id}/edit`)
  }

  const handleDelete = (activityId) => {
    setTimeout(() => setDeleteActivityId(activityId), 0)
  }

  const confirmDelete = () => {
    setActivities(activities.filter(activity => activity.id !== deleteActivityId))
    setTimeout(() => setDeleteActivityId(null), 100)
  }

  const handleSelectRow = (activityId) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(activityId)) {
      newSelected.delete(activityId)
    } else {
      newSelected.add(activityId)
    }
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === currentActivities.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentActivities.map(activity => activity.id)))
    }
  }

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentActivities = filteredActivities.slice(startIndex, endIndex)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  const getStatusBadge = (activity) => {
    if (activity.is_featured) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Featured
        </Badge>
      )
    }
    if (activity.is_active) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Active
        </Badge>
      )
    }
    return <Badge variant="secondary">Inactive</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Loading activities...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">All Activities</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage all activities ({filteredActivities.length} total)
          </p>
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
            <Button variant="outline" onClick={handleRefresh} className="w-full sm:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate("/admin/create-activities")} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Activity
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
                placeholder="Search activities..."
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

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
                <SelectItem value="timeSlotCount">Sort by Time Slots</SelectItem>
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
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="with-slots">With Time Slots</SelectItem>
                    <SelectItem value="no-slots">No Time Slots</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
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
            <span className="text-sm font-medium text-blue-900">{selectedRows.size} activities selected</span>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Activities Table - Desktop */}
      <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-3 sm:px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedRows.size === currentActivities.length && currentActivities.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                  Activity
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Price
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                  Time Slots
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentActivities.map((activity) => {
                return (
                  <tr
                    key={activity.id}
                    className={`${selectedRows.has(activity.id) ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-3 sm:px-6 py-4">
                      <Checkbox
                        checked={selectedRows.has(activity.id)}
                        onCheckedChange={() => handleSelectRow(activity.id)}
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[150px] sm:max-w-xs">
                          {activity.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{formatPrice(activity.price)}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <Badge variant={activity.timeSlotCount > 0 ? "default" : "secondary"}>
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.timeSlotCount} slot{activity.timeSlotCount !== 1 ? "s" : ""}
                      </Badge>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{getStatusBadge(activity)}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-900 truncate max-w-[100px]">{activity.location}</span>
                      </div>
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
                          <DropdownMenuItem onClick={() => handleView(activity)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(activity)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Activity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(activity.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
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
                  <span className="font-medium">{Math.min(endIndex, filteredActivities.length)}</span> of{" "}
                  <span className="font-medium">{filteredActivities.length}</span> results
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

      {/* Mobile Cards View */}
      <div className="block sm:hidden">
        <div className="space-y-4">
          {currentActivities.map((activity) => {
            return (
              <div key={activity.id} className="bg-white rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedRows.has(activity.id)}
                      onCheckedChange={() => handleSelectRow(activity.id)}
                    />
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.location}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(activity)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(activity)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Activity
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(activity.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Description</span>
                    <span className="text-sm font-medium truncate max-w-[150px]">{activity.description}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price</span>
                    <span className="text-sm font-medium">{formatPrice(activity.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Time Slots</span>
                    <Badge variant={activity.timeSlotCount > 0 ? "default" : "secondary"} className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.timeSlotCount}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    {getStatusBadge(activity)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
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
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteActivityId}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => setDeleteActivityId(null), 100)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Activity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this activity? This action cannot be undone.
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

export default Activities