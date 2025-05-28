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
  Calendar,
  MapPin,
  DollarSign,
  Package,
  ChevronDown,
  Download,
  RefreshCw,
  Users,
  Star,
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

const PackagesTable = () => {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [deletePackageId, setDeletePackageId] = useState(null)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [showMobileOptions, setShowMobileOptions] = useState(false)

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
        media: [
          {
            id: 1,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Package Image 1",
          },
          {
            id: 2,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Package Image 2",
          },
          {
            id: 3,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Package Image 3",
          },
          {
            id: 4,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Package Image 4",
          },
        ],
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
        media: [
          {
            id: 5,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Paris Image 1",
          },
          {
            id: 6,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Paris Image 2",
          },
          {
            id: 7,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Paris Image 3",
          },
          {
            id: 8,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Paris Image 4",
          },
          {
            id: 9,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Paris Image 5",
          },
        ],
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
        media: [
          {
            id: 10,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Alaska Image 1",
          },
          {
            id: 11,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Alaska Image 2",
          },
          {
            id: 12,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Alaska Image 3",
          },
        ],
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
        media: [
          {
            id: 13,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Tokyo Image 1",
          },
          {
            id: 14,
            url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-odZFjikqE5CAQBnoLvCsZyZYl6eRqV.png",
            type: "image",
            name: "Tokyo Image 2",
          },
        ],
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
    navigate(`/admin/packages/${pkg.id}`)
  }

  const handleEdit = (pkg) => {
    navigate(`/admin/packages/${pkg.id}/edit`)
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

  const renderImagesColumn = (media) => {
    if (!media || media.length === 0) {
      return (
        <div className="flex items-center justify-center w-16 h-12 bg-gray-100 rounded border-2 border-dashed border-gray-300">
          <span className="text-xs text-gray-400">No images</span>
        </div>
      )
    }

    const displayImages = media.slice(0, 2) // Show first 2 images
    const remainingCount = media.length - displayImages.length

    return (
      <div className="flex items-center space-x-1">
        {displayImages.map((image, index) => (
          <div key={image.id} className="relative">
            <img
              src={image.url || "/placeholder.svg?height=40&width=40"}
              alt={image.name || `Package image ${index + 1}`}
              className="w-10 h-10 object-cover rounded border border-gray-200"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded border border-gray-200">
            <span className="text-xs font-medium text-gray-600">+{remainingCount}</span>
          </div>
        )}
      </div>
    )
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
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Travel Packages</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your travel packages and bookings ({filteredPackages.length} total)
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
            <Button onClick={() => navigate("/admin/package-builder")} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Package
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
                placeholder="Search packages, locations..."
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
            <Select value={sortBy} onValueChange={setSortBy} className="w-full sm:w-48">
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="base_price">Sort by Price</SelectItem>
                <SelectItem value="activities_count">Sort by Activities</SelectItem>
                <SelectItem value="location">Sort by Location</SelectItem>
                <SelectItem value="visibility">Sort by Visibility</SelectItem>
                <SelectItem value="is_refundable">Sort by Refundable</SelectItem>
                <SelectItem value="check_in_time">Sort by Check-in Date</SelectItem>
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
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <span className="text-sm font-medium text-blue-900">{selectedRows.size} packages selected</span>
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

      {/* Packages Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-3 sm:px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedRows.size === currentPackages.length && currentPackages.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activities
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visibility
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refundable
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <td className="px-3 sm:px-6 py-4">
                    <Checkbox checked={selectedRows.has(pkg.id)} onCheckedChange={() => handleSelectRow(pkg.id)} />
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{renderImagesColumn(pkg.media)}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-xs">
                        {pkg.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-red-500 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm text-gray-900">{pkg.location}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-500 mr-0 sm:mr-1" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        {formatPrice(pkg.base_price)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <Badge variant={pkg.activities_count > 0 ? "default" : "secondary"} className="text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {pkg.activities_count}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className="capitalize text-xs">
                      {pkg.visibility}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={pkg.is_refundable ? "default" : "secondary"}
                      className={`text-xs ${pkg.is_refundable ? "bg-green-100 text-green-800" : ""}`}
                    >
                      {pkg.is_refundable ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{getStatusBadge(pkg)}</td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-xs sm:text-sm text-gray-900">{formatDate(pkg.check_in_time)}</span>
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

export default PackagesTable
