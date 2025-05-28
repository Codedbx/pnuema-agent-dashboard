"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Edit, MapPin, DollarSign, Calendar, Users, Star, Shield, Eye, Upload, X, Download } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const PackageDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [packageData, setPackageData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ])

  // Mock data - replace with actual API call
  const mockPackages = {
    2: {
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
    3: {
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
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const pkg = mockPackages[id]
      if (pkg) {
        setPackageData(pkg)
      }
      setLoading(false)
    }, 500)
  }, [id])

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

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading package details...</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Package not found</h3>
        <p className="mt-1 text-gray-500">The package you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/admin/packages")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/admin/packages")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{packageData.title}</h1>
            <p className="text-gray-600">Package ID: {packageData.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Details
          </Button>
          <Button onClick={() => navigate(`/admin/packages/${id}/edit`)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Package
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Images */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Package Images</CardTitle>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Images
                    </label>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Package image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload images to showcase this package.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Package Information */}
          <Card>
            <CardHeader>
              <CardTitle>Package Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <p className="text-sm text-gray-900 mt-1">{packageData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Location</Label>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm text-gray-900">{packageData.location}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Base Price</Label>
                  <div className="flex items-center mt-1">
                    <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{formatPrice(packageData.base_price)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Check-in</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-900">{formatDate(packageData.check_in_time)}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Check-out</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-900">{formatDate(packageData.check_out_time)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Booking Start</Label>
                  <span className="text-sm text-gray-900 block mt-1">{formatDate(packageData.booking_start_date)}</span>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Booking End</Label>
                  <span className="text-sm text-gray-900 block mt-1">{formatDate(packageData.booking_end_date)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium text-gray-700">Terms & Conditions</Label>
                <p className="text-sm text-gray-900 mt-1">{packageData.terms_and_conditions}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Cancellation Policy</Label>
                <p className="text-sm text-gray-900 mt-1">{packageData.cancellation_policy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          {packageData.activities && packageData.activities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Package Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {packageData.activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          <div className="flex items-center mt-2">
                            <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-sm font-medium text-green-600">{formatPrice(activity.price)}</span>
                          </div>
                        </div>
                        <Badge variant="outline">
                          <Users className="w-3 h-3 mr-1" />
                          {activity.time_slots?.length || 0} slots
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Package Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(packageData)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Visibility</span>
                <Badge variant="outline" className="capitalize">
                  {packageData.visibility}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Refundable</span>
                <Badge variant={packageData.is_refundable ? "default" : "secondary"}>
                  {packageData.is_refundable ? "Yes" : "No"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Activities</span>
                <Badge variant="outline">
                  <Users className="w-3 h-3 mr-1" />
                  {packageData.activities_count}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Owner ID: {packageData.owner_id}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                View Bookings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Activities
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PackageDetails
