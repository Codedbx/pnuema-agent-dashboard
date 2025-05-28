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
  MapPin,
  DollarSign,
  Package,
  ChevronDown,
  Download,
  RefreshCw,
  Save,
  Users,
  Star,
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
import { Switch } from "@/components/ui/switch"
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

const PackagesTable = () => {
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletePackageId, setDeletePackageId] = useState(null)
  const [viewingPackage, setViewingPackage] = useState(null)
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
    // Simulate loading and set packages data
    setTimeout(() => {
      setPackages(apiData.data)
      setFilteredPackages(apiData.data)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const filtered = packages.filter((pkg) => {
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase())

      if (filterStatus === "all") return matchesSearch
      if (filterStatus === "active") return matchesSearch && pkg.is_active
      if (filterStatus === "inactive") return matchesSearch && !pkg.is_active
      if (filterStatus === "featured") return matchesSearch && pkg.is_featured
      if (filterStatus === "refundable") return matchesSearch && pkg.is_refundable
      if (filterStatus === "with-activities") return matchesSearch && pkg.activities_count > 0
      if (filterStatus === "no-activities") return matchesSearch && pkg.activities_count === 0

      return matchesSearch
    })

    // Sort packages
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "base_price") {
        aValue = Number.parseFloat(aValue)
        bValue = Number.parseFloat(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredPackages(filtered)
    setCurrentPage(1)
  }, [searchTerm, filterStatus, sortBy, sortOrder, packages])

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

  const handleView = (pkg) => {
    setViewingPackage(pkg)
    setTimeout(() => setIsViewDialogOpen(true), 0)
  }

  const handleEdit = (pkg) => {
    setEditingPackage({ ...pkg })
    setTimeout(() => setIsEditDialogOpen(true), 0)
  }

  const handleSaveEdit = () => {
    const updatedPackage = {
      ...editingPackage,
      activities_count: editingPackage.activities ? editingPackage.activities.length : 0,
    }

    setPackages(packages.map((pkg) => (pkg.id === editingPackage.id ? updatedPackage : pkg)))
    setIsEditDialogOpen(false)
    setTimeout(() => setEditingPackage(null), 100)
  }

  const handleDelete = (packageId) => {
    setTimeout(() => setDeletePackageId(packageId), 0)
  }

  const confirmDelete = () => {
    setPackages(packages.filter((pkg) => pkg.id !== deletePackageId))
    setTimeout(() => setDeletePackageId(null), 100)
  }

  const handleSelectRow = (packageId) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(packageId)) {
      newSelected.delete(packageId)
    } else {
      newSelected.add(packageId)
    }
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === currentPackages.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentPackages.map((pkg) => pkg.id)))
    }
  }

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPackages = filteredPackages.slice(startIndex, endIndex)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  const getStatusBadge = (pkg) => {
    if (pkg.is_featured) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Star className="w-3 h-3 mr-1" />
          Featured
        </Badge>
      )
    }
    if (pkg.is_active) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Active
        </Badge>
      )
    }
    return <Badge variant="secondary">Inactive</Badge>
  }

  const handleInputChange = (field, value) => {
    setEditingPackage((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Loading packages...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Travel Packages</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your travel packages and bookings ({filteredPackages.length} total)
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
            Create Package
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
                placeholder="Search packages, locations..."
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
                <SelectItem value="base_price">Sort by Price</SelectItem>
                <SelectItem value="activities_count">Sort by Activities</SelectItem>
                <SelectItem value="location">Sort by Location</SelectItem>
                <SelectItem value="check_in_time">Sort by Check-in Date</SelectItem>
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
                    <SelectItem value="all">All Packages</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                    <SelectItem value="refundable">Refundable Only</SelectItem>
                    <SelectItem value="with-activities">With Activities</SelectItem>
                    <SelectItem value="no-activities">No Activities</SelectItem>
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
            <span className="text-sm font-medium text-blue-900">{selectedRows.size} packages selected</span>
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

      {/* Packages Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedRows.size === currentPackages.length && currentPackages.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activities
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPackages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className={`${selectedRows.has(pkg.id) ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-6 py-4">
                    <Checkbox checked={selectedRows.has(pkg.id)} onCheckedChange={() => handleSelectRow(pkg.id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{pkg.description}</div>
                      <div className="flex gap-1 mt-1">
                        {pkg.is_refundable && (
                          <Badge variant="outline" className="text-xs">
                            Refundable
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {pkg.visibility}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm text-gray-900">{pkg.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">{formatPrice(pkg.base_price)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={pkg.activities_count > 0 ? "default" : "secondary"}>
                      <Users className="w-3 h-3 mr-1" />
                      {pkg.activities_count} activit{pkg.activities_count !== 1 ? "ies" : "y"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(pkg)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-900">{formatDate(pkg.check_in_time)}</span>
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
                        <DropdownMenuItem onClick={() => handleView(pkg)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(pkg)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Package
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(pkg.id)} className="text-red-600">
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

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No packages found</h3>
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
                  <span className="font-medium">{Math.min(endIndex, filteredPackages.length)}</span> of{" "}
                  <span className="font-medium">{filteredPackages.length}</span> results
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

      {/* View Package Dialog */}
      <Dialog
        open={isViewDialogOpen}
        onOpenChange={(open) => {
          setIsViewDialogOpen(open)
          if (!open) {
            setTimeout(() => setViewingPackage(null), 100)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Package Details</DialogTitle>
            <DialogDescription>View detailed information about this travel package.</DialogDescription>
          </DialogHeader>
          {viewingPackage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Title</Label>
                  <p className="text-sm text-gray-900 mt-1">{viewingPackage.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Base Price</Label>
                  <p className="text-sm text-gray-900 mt-1">{formatPrice(viewingPackage.base_price)}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-sm text-gray-900 mt-1">{viewingPackage.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Location</Label>
                  <p className="text-sm text-gray-900 mt-1">{viewingPackage.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Visibility</Label>
                  <p className="text-sm text-gray-900 mt-1 capitalize">{viewingPackage.visibility}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Check-in</Label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(viewingPackage.check_in_time)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Check-out</Label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(viewingPackage.check_out_time)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Booking Start</Label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(viewingPackage.booking_start_date)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Booking End</Label>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(viewingPackage.booking_end_date)}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Terms & Conditions</Label>
                <p className="text-sm text-gray-900 mt-1">{viewingPackage.terms_and_conditions}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Cancellation Policy</Label>
                <p className="text-sm text-gray-900 mt-1">{viewingPackage.cancellation_policy}</p>
              </div>
              {viewingPackage.activities && viewingPackage.activities.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Activities</Label>
                  <div className="mt-2 space-y-2">
                    {viewingPackage.activities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2 text-sm">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>
                          {activity.title} - {formatPrice(activity.price)}
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

      {/* Edit Package Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) {
            setTimeout(() => setEditingPackage(null), 100)
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
            <DialogDescription>Make changes to the package details and manage activities below.</DialogDescription>
          </DialogHeader>
          {editingPackage && (
            <div className="space-y-6">
              {/* Basic Package Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Package Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editingPackage.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      value={editingPackage.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingPackage.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">Base Price ($)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      value={editingPackage.base_price}
                      onChange={(e) => handleInputChange("base_price", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-visibility">Visibility</Label>
                    <Select
                      value={editingPackage.visibility}
                      onValueChange={(value) => handleInputChange("visibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-checkin">Check-in Date & Time</Label>
                    <Input
                      id="edit-checkin"
                      type="datetime-local"
                      value={new Date(editingPackage.check_in_time).toISOString().slice(0, 16)}
                      onChange={(e) => handleInputChange("check_in_time", new Date(e.target.value).toISOString())}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-checkout">Check-out Date & Time</Label>
                    <Input
                      id="edit-checkout"
                      type="datetime-local"
                      value={new Date(editingPackage.check_out_time).toISOString().slice(0, 16)}
                      onChange={(e) => handleInputChange("check_out_time", new Date(e.target.value).toISOString())}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingPackage.is_active}
                      onCheckedChange={(checked) => handleInputChange("is_active", checked)}
                    />
                    <Label>Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingPackage.is_featured}
                      onCheckedChange={(checked) => handleInputChange("is_featured", checked)}
                    />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingPackage.is_refundable}
                      onCheckedChange={(checked) => handleInputChange("is_refundable", checked)}
                    />
                    <Label>Refundable</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-terms">Terms & Conditions</Label>
                  <Textarea
                    id="edit-terms"
                    value={editingPackage.terms_and_conditions}
                    onChange={(e) => handleInputChange("terms_and_conditions", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-cancellation">Cancellation Policy</Label>
                  <Textarea
                    id="edit-cancellation"
                    value={editingPackage.cancellation_policy}
                    onChange={(e) => handleInputChange("cancellation_policy", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Activities Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Activities</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newActivity = {
                        id: Date.now(),
                        title: "",
                        description: "",
                        price: "0.00",
                        time_slots: [],
                      }
                      handleInputChange("activities", [...(editingPackage.activities || []), newActivity])
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </div>

                {editingPackage.activities && editingPackage.activities.length > 0 ? (
                  <div className="space-y-3">
                    {editingPackage.activities.map((activity, index) => (
                      <div key={activity.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">Activity {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedActivities = editingPackage.activities.filter((_, i) => i !== index)
                              handleInputChange("activities", updatedActivities)
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Activity Title</Label>
                            <Input
                              value={activity.title}
                              onChange={(e) => {
                                const updatedActivities = [...editingPackage.activities]
                                updatedActivities[index] = { ...activity, title: e.target.value }
                                handleInputChange("activities", updatedActivities)
                              }}
                            />
                          </div>
                          <div>
                            <Label>Price ($)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={activity.price}
                              onChange={(e) => {
                                const updatedActivities = [...editingPackage.activities]
                                updatedActivities[index] = { ...activity, price: e.target.value }
                                handleInputChange("activities", updatedActivities)
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={activity.description}
                            onChange={(e) => {
                              const updatedActivities = [...editingPackage.activities]
                              updatedActivities[index] = { ...activity, description: e.target.value }
                              handleInputChange("activities", updatedActivities)
                            }}
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <Users className="mx-auto h-8 w-8 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No activities</h3>
                    <p className="mt-1 text-sm text-gray-500">Add activities to enhance this package.</p>
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
        open={!!deletePackageId}
        onOpenChange={(open) => {
          if (!open) {
            setTimeout(() => setDeletePackageId(null), 100)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this package? This action cannot be undone and will also remove all
              associated activities.
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

export default PackagesTable
