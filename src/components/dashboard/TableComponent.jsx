"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Calendar } from "lucide-react"

// Mock shadcn/ui components for standalone use
const Table = ({ children, className = "" }) => (
  <div className={`w-full ${className}`}>
    <table className="w-full caption-bottom text-sm">{children}</table>
  </div>
)

const TableHeader = ({ children }) => <thead className="[&_tr]:border-b">{children}</thead>

const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>

const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
    {children}
  </tr>
)

const TableHead = ({ children, className = "" }) => (
  <th
    className={`h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground text-xs sm:text-sm [&:has([role=checkbox])]:pr-0 ${className}`}
  >
    {children}
  </th>
)

const TableCell = ({ children, className = "" }) => (
  <td className={`p-2 sm:p-4 align-middle text-xs sm:text-sm [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
)

const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 sm:h-9 rounded-md px-2 sm:px-3 text-xs sm:text-sm",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-8 sm:h-10 w-full rounded-md border border-input bg-background px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "text-foreground",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-1.5 sm:px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

const Checkbox = ({ checked, onCheckedChange, ...props }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
    className="h-3 w-3 sm:h-4 sm:w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary"
    {...props}
  />
)

const TableComponent = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState(new Set())

  const trips = [
    {
      id: 1,
      user: {
        name: "Kate Morrison",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      },
      package: "Venice Dream",
      duration: "5D-4N",
      date: "25 Jun-30 Jun",
      status: "Hold",
      statusVariant: "secondary",
    },
    {
      id: 2,
      user: {
        name: "Aliah Lane",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      },
      package: "Safari Adventure",
      duration: "4D-3N",
      date: "25 Jun-30 Jun",
      status: "Cancelled",
      statusVariant: "outline",
    },
    {
      id: 3,
      user: {
        name: "Andi Lane",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      },
      package: "Alpin Escape",
      duration: "4D-3N",
      date: "25 Jun-30 Jun",
      status: "Pending",
      statusVariant: "default",
    },
    {
      id: 4,
      user: {
        name: "Drew Cano",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      },
      package: "Venice Dream",
      duration: "5D-4N",
      date: "25 Jun-30 Jun",
      status: "Finished",
      statusVariant: "default",
    },
    {
      id: 5,
      user: {
        name: "Koray Okumus",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      },
      package: "Alpin Escape",
      duration: "6D-5N",
      date: "25 Jun-30 Jun",
      status: "Confirm",
      statusVariant: "default",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Hold":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "Cancelled":
        return "bg-gray-100 text-gray-600 hover:bg-gray-100"
      case "Pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      case "Finished":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "Confirm":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100"
    }
  }

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === trips.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(trips.map((trip) => trip.id)))
    }
  }

  const filteredTrips = trips.filter(
    (trip) =>
      trip.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.package.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden">
      {/* Table Header - Mobile Responsive */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Upcoming Trips</h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Button size="sm" className="bg-black hover:bg-gray-800 order-2 sm:order-1">
            Delete
          </Button>

          <div className="relative order-1 sm:order-2">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 pr-8 sm:pr-12 w-full sm:w-48"
            />
            <kbd className="hidden sm:block absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 px-1 sm:px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 border rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Table Container - Full responsive with horizontal scroll */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-8 sm:w-12">
                  <Checkbox
                    checked={selectedRows.size === trips.length && trips.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[120px] sm:min-w-[160px]">User</TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[120px]">Package</TableHead>
                <TableHead className="min-w-[60px] sm:min-w-[80px]">Duration</TableHead>
                <TableHead className="min-w-[100px] sm:min-w-[120px]">Date</TableHead>
                <TableHead className="min-w-[80px] sm:min-w-[100px]">Status</TableHead>
                <TableHead className="w-8 sm:w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.map((trip) => (
                <TableRow key={trip.id} className={selectedRows.has(trip.id) ? "bg-gray-50" : ""}>
                  <TableCell>
                    <Checkbox checked={selectedRows.has(trip.id)} onCheckedChange={() => handleSelectRow(trip.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-w-0">
                      <img
                        src={trip.user.avatar || "/placeholder.svg"}
                        alt={trip.user.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover mr-2 sm:mr-3 flex-shrink-0"
                      />
                      <span className="font-medium truncate text-xs sm:text-sm">{trip.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{trip.package}</TableCell>
                  <TableCell>{trip.duration}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-400 flex-shrink-0" />
                      <span className="whitespace-nowrap text-xs sm:text-sm">{trip.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(trip.status)}>
                      {trip.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                      <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Empty state for filtered results */}
      {filteredTrips.length === 0 && (
        <div className="text-center py-6 sm:py-8 text-gray-500 text-sm">No trips found matching your search.</div>
      )}
    </div>
  )
}

export default TableComponent
