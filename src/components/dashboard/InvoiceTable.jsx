"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Calendar, Menu, Filter, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const InvoiceTable = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const invoices = [
    {
      id: 1,
      invoiceNumber: "INV-001",
      customer: "John Doe",
      amount: "1,250.00",
      status: "Paid",
      dueDate: "2025-02-15",
      issueDate: "2025-01-15",
    },
    {
      id: 2,
      invoiceNumber: "INV-002",
      customer: "Jane Smith",
      amount: "2,100.50",
      status: "Pending",
      dueDate: "2025-02-20",
      issueDate: "2025-01-20",
    },
    {
      id: 3,
      invoiceNumber: "INV-003",
      customer: "Bob Johnson",
      amount: "875.25",
      status: "Overdue",
      dueDate: "2025-01-30",
      issueDate: "2025-01-01",
    },
    {
      id: 4,
      invoiceNumber: "INV-004",
      customer: "Alice Brown",
      amount: "3,200.00",
      status: "Paid",
      dueDate: "2025-02-25",
      issueDate: "2025-01-25",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "Pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      case "Overdue":
        return "bg-red-100 text-red-700 hover:bg-red-100"
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
    if (selectedRows.size === invoices.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(invoices.map((invoice) => invoice.id)))
    }
  }

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="bg-[#F7F9FB] rounded-lg border">
      {/* Table Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 p-4 sm:p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>

        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="sm"
            className="sm:hidden w-fit"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Menu className="h-4 w-4 mr-2" />
            Options
          </Button>

          {/* Desktop controls */}
          <div
            className={`flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 ${showMobileFilters ? "block" : "hidden sm:flex"}`}
          >
            <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
              Delete Selected
            </Button>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full sm:w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.size === invoices.length && invoices.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[120px]">Invoice #</TableHead>
              <TableHead className="min-w-[150px]">Customer</TableHead>
              <TableHead className="min-w-[100px]">Amount</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[120px]">Issue Date</TableHead>
              <TableHead className="min-w-[120px]">Due Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className={selectedRows.has(invoice.id) ? "bg-muted/50" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(invoice.id)}
                    onCheckedChange={() => handleSelectRow(invoice.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell className="font-medium">${invoice.amount}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    {invoice.issueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    {invoice.dueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View More Button */}
      <div className="flex justify-center p-4 border-t">
        <Button variant="outline" className="bg-black text-white hover:bg-gray-800 px-6">
          View More
        </Button>
      </div>
    </div>
  )
}

export default InvoiceTable
