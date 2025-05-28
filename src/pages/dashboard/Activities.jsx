"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Package,
  ChevronDown,
  Download,
  RefreshCw,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Textarea } from "@/components/ui/textarea"
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
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteActivityId, setDeleteActivityId] = useState(null)
  const [viewingActivity, setViewingActivity] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState(new Set())

  const itemsPerPage = 10

  // Your API data
  const apiData = {
    status: "success",
    data: [
      {
        id: 2,
        title: "Hello",
        description: "This is a title",
        base_price: "2999.00",
        check_in_time: "2025-05-25T14:57:29.000000Z",
        check_out_time: "2025-05-25T14:57:29.000000Z",
        booking_start_date: "2025-05-25T14:57:29.000000Z",
        booking_end_date: "2025-05-25T14:57:29.000000Z",
        is_active: true,
        is_featured: false,
        is_refundable: true,
        terms_and_conditions: "fafjdkf ajfkhj",
        cancellation_policy: "cancel",
        location: "nigeria",
        owner_id: 1,
        visibility: "public",
        activities_count: 0,
        media: [],
        activities: [],
      },
      {
        id: 3,
        title: "Luxury Paris Getaway",
        description: "5-day luxury package with Eiffel Tower access and river cruise",
        base_price: "2999.99",
        check_in_time: "2025-06-01T14:00:00.000000Z",
        check_out_time: "2025-06-06T11:00:00.000000Z",
        booking_start_date: "2025-05-25T00:00:00.000000Z",
        booking_end_date: "2025-05-30T23:59:59.000000Z",
        is_active: true,
        is_featured: true,
        is_refundable: true,
        terms_and_conditions: "Non-refundable after 30 days prior to check-in",
        cancellation_policy: "Full refund if cancelled 45 days before arrival",
        location: "Paris, France",
        owner_id: 1,
        visibility: "public",
        activities_count: 2,
        media: [],
        activities: [
          {
            id: 2,
            title: "Swimming",
            description: "going swimming at the beach",
            price: "600.00",
            time_slots: [
              {
                id: 1,
                starts_at: "2025-05-25T17:34:32.000000Z",
                ends_at: "2025-05-25T17:34:32.000000Z",
              },
              {
                id: 2,
                starts_at: "2025-05-28T16:34:59.000000Z",
                ends_at: "2025-05-31T16:34:59.000000Z",
              },
            ],
          },
          {
            id: 1,
            title: "hiking",
            description: "on the mountiains",
            price: "500.00",
            time_slots: [
              {
                id: 3,
                starts_at: "2025-05-28T16:36:10.000000Z",
                ends_at: "2025-05-31T16:36:10.000000Z",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Alaskan Adventure Package",
        description: "10-day wildlife tour with glacier hikes and whale watching",
        base_price: "1899.95",
        check_in_time: "2025-08-10T12:00:00.000000Z",
        check_out_time: "2025-08-20T10:00:00.000000Z",
        booking_start_date: "2025-07-01T00:00:00.000000Z",
        booking_end_date: "2025-07-31T23:59:59.000000Z",
        is_active: true,
        is_featured: true,
        is_refundable: false,
        terms_and_conditions: "Weather-dependent activities",
        cancellation_policy: "No refunds for weather cancellations",
        location: "Anchorage, Alaska",
        owner_id: 1,
        visibility: "public",
        activities_count: 2,
        media: [],
        activities: [
          {
            id: 1,
            title: "hiking",
            description: "on the mountiains",
            price: "500.00",
            time_slots: [
              {
                id: 3,
                starts_at: "2025-05-28T16:36:10.000000Z",
                ends_at: "2025-05-31T16:36:10.000000Z",
              },
            ],
          },
          {
            id: 2,
            title: "Swimming",
            description: "going swimming at the beach",
            price: "600.00",
            time_slots: [
              {
                id: 1,
                starts_at: "2025-05-25T17:34:32.000000Z",
                ends_at: "2025-05-25T17:34:32.000000Z",
              },
              {
                id: 2,
                starts_at: "2025-05-28T16:34:59.000000Z",
                ends_at: "2025-05-31T16:34:59.000000Z",
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Tokyo City Experience",
        description: "4-day cultural immersion with sushi class and temple tours",
        base_price: "1299.50",
        check_in_time: "2025-09-01T16:00:00.000000Z",
        check_out_time: "2025-09-05T11:00:00.000000Z",
        booking_start_date: "2025-08-01T00:00:00.000000Z",
        booking_end_date: "2025-08-25T23:59:59.000000Z",
        is_active: true,
        is_featured: true,
        is_refundable: true,
        terms_and_conditions: "Valid passport required",
        cancellation_policy: "Free date changes up to 7 days before",
        location: "Tokyo, Japan",
        owner_id: 1,
        visibility: "public",
        activities_count: 0,
        media: [],
        activities: [],
      },
    ],
  }

  useEffect(() => {
    // Process API data to extract all activities
    setTimeout(() => {
      const allActivities = []
      apiData.data.forEach((pkg) => {
        pkg.activities.forEach((activity) => {
          allActivities.push({
            ...activity,
            packageTitle: pkg.title,
            packageId: pkg.id,
            packageLocation: pkg.location,
            packagePrice: pkg.base_price,
            timeSlotCount: activity.time_slots?.length || 0,
            isActive: pkg.is_active,
            isFeatured: pkg.is_featured,
          })
        })
      })
      setActivities(allActivities)
      setFilteredActivities(allActivities)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const filtered = activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.packageTitle.toLowerCase().includes(searchTerm.toLowerCase())

      if (filterStatus === "all") return matchesSearch
      if (filterStatus === "with-slots") return matchesSearch && activity.timeSlotCount > 0
      if (filterStatus === "no-slots") return matchesSearch && activity.timeSlotCount === 0
      if (filterStatus === "active") return matchesSearch && activity.isActive
      if (filterStatus === "featured") return matchesSearch && activity.isFeatured

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
    setViewingActivity(activity)
    setTimeout(() => setIsViewDialogOpen(true), 0)
  }

  const handleEdit = (activity) => {
    setEditingActivity({ ...activity })
    setTimeout(() => setIsEditDialogOpen(true), 0)
  }

  const handleSaveEdit = () => {
    const updatedActivity = {
      ...editingActivity,
      timeSlotCount: editingActivity.time_slots?.length || 0,
    }

    setActivities(
      activities.map((activity) =>
        activity.id === editingActivity.id && activity.packageId === editingActivity.packageId
          ? updatedActivity
          : activity,
      ),
    )
    setIsEditDialogOpen(false)
    setTimeout(() => setEditingActivity(null), 100)
  }

  const handleDelete = (activityId, packageId) => {
    setTimeout(() => setDeleteActivityId({ activityId, packageId }), 0)
  }

  const confirmDelete = () => {
    setActivities(
      activities.filter(
        (activity) =>
          !(activity.id === deleteActivityId.activityId && activity.packageId === deleteActivityId.packageId),
      ),
    )
    setTimeout(() => setDeleteActivityId(null), 100)
  }

  const handleSelectRow = (activityKey) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(activityKey)) {
      newSelected.delete(activityKey)
    } else {
      newSelected.add(activityKey)
    }
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === currentActivities.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentActivities.map((activity) => `${activity.packageId}-${activity.id}`)))
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
    if (activity.isFeatured) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Featured
        </Badge>
      )
    }
    if (activity.isActive) {
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">All Activities</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage all activities across your travel packages ({filteredActivities.length} total)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Activity
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search activities, packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
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

          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
                <SelectItem value="timeSlotCount">Sort by Time Slots</SelectItem>
                <SelectItem value="packageTitle">Sort by Package</SelectItem>
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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">{selectedRows.size} activities selected</span>
            <div className="flex space-x-2">
              <Button variant="destructive" size="sm">
                Delete Selected
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Activities Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedRows.size === currentActivities.length && currentActivities.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Slots
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentActivities.map((activity) => {
                const activityKey = `${activity.packageId}-${activity.id}`
                return (
                  <tr
                    key={activityKey}
                    className={`${selectedRows.has(activityKey) ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedRows.has(activityKey)}
                        onCheckedChange={() => handleSelectRow(activityKey)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{activity.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">{activity.packageTitle}</div>
                          <div className="text-xs text-gray-500">Base: {formatPrice(activity.packagePrice)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{formatPrice(activity.price)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={activity.timeSlotCount > 0 ? "default" : "secondary"}>
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.timeSlotCount} slot{activity.timeSlotCount !== 1 ? "s" : ""}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(activity)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-900">{activity.packageLocation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                            <ChevronDown className="w-4 h-4 ml-1" />
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
                            onClick={() => handleDelete(activity.id, activity.packageId)}
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

      {/* View Activity Dialog */}
      <Dialog
        open={isViewDialogOpen}
        onOpenChange={(open) => {
          setIsViewDialogOpen(open)
          if (!open) {
            setTimeout(() => setViewingActivity(null), 100)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
            <DialogDescription>View detailed information about this activity.</DialogDescription>
          </DialogHeader>
          {viewingActivity && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Title</Label>
                  <p className="text-sm text-gray-900 mt-1">{viewingActivity.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Price</Label>
                  <p className="text-sm text-gray-900 mt-1">{formatPrice(viewingActivity.price)}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-sm text-gray-900 mt-1">{viewingActivity.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Package</Label>
                  <p className="text-sm text-gray-900 mt-1">{viewingActivity.packageTitle}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Location</Label>
                  <p className="text-sm text-gray-900 mt-1">{viewingActivity.packageLocation}</p>
                </div>
              </div>
              {viewingActivity.time_slots && viewingActivity.time_slots.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Time Slots</Label>
                  <div className="mt-2 space-y-2">
                    {viewingActivity.time_slots.map((slot, index) => (
                      <div key={slot.id} className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>
                          {formatDate(slot.starts_at)} - {formatDate(slot.ends_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Activity Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) {
            setTimeout(() => setEditingActivity(null), 100)
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>Make changes to the activity details and manage time slots below.</DialogDescription>
          </DialogHeader>
          {editingActivity && (
            <div className="space-y-6">
              {/* Basic Activity Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Activity Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editingActivity.title}
                      onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Price</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={editingActivity.price}
                      onChange={(e) => setEditingActivity({ ...editingActivity, price: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingActivity.description}
                    onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              {/* Time Slots Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Time Slots</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newTimeSlot = {
                        id: Date.now(), // Temporary ID for new slots
                        starts_at: new Date().toISOString(),
                        ends_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
                      }
                      setEditingActivity({
                        ...editingActivity,
                        time_slots: [...(editingActivity.time_slots || []), newTimeSlot],
                      })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>

                {editingActivity.time_slots && editingActivity.time_slots.length > 0 ? (
                  <div className="space-y-3">
                    {editingActivity.time_slots.map((slot, index) => (
                      <div key={slot.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">Time Slot {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedSlots = editingActivity.time_slots.filter((_, i) => i !== index)
                              setEditingActivity({
                                ...editingActivity,
                                time_slots: updatedSlots,
                              })
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`start-${slot.id}`}>Start Date & Time</Label>
                            <Input
                              id={`start-${slot.id}`}
                              type="datetime-local"
                              value={new Date(slot.starts_at).toISOString().slice(0, 16)}
                              onChange={(e) => {
                                const updatedSlots = [...editingActivity.time_slots]
                                updatedSlots[index] = {
                                  ...slot,
                                  starts_at: new Date(e.target.value).toISOString(),
                                }
                                setEditingActivity({
                                  ...editingActivity,
                                  time_slots: updatedSlots,
                                })
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`end-${slot.id}`}>End Date & Time</Label>
                            <Input
                              id={`end-${slot.id}`}
                              type="datetime-local"
                              value={new Date(slot.ends_at).toISOString().slice(0, 16)}
                              onChange={(e) => {
                                const updatedSlots = [...editingActivity.time_slots]
                                updatedSlots[index] = {
                                  ...slot,
                                  ends_at: new Date(e.target.value).toISOString(),
                                }
                                setEditingActivity({
                                  ...editingActivity,
                                  time_slots: updatedSlots,
                                })
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Duration: {Math.round((new Date(slot.ends_at) - new Date(slot.starts_at)) / (1000 * 60 * 60))}{" "}
                          hours
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <Clock className="mx-auto h-8 w-8 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No time slots</h3>
                    <p className="mt-1 text-sm text-gray-500">Add time slots to schedule this activity.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

export default Activities
