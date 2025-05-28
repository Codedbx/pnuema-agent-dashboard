"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Users, Calendar, MapPin, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const EditPackage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [packageData, setPackageData] = useState(null)
  const [images, setImages] = useState([
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
      activities: [
        {
          id: 2,
          title: "Swimming",
          description: "going swimming at the beach",
          price: "600.00",
        },
        {
          id: 1,
          title: "hiking",
          description: "on the mountiains",
          price: "500.00",
        },
      ],
    },
    5: {
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
      activities: [
        {
          id: 1,
          title: "hiking",
          description: "on the mountiains",
          price: "500.00",
        },
        {
          id: 2,
          title: "Swimming",
          description: "going swimming at the beach",
          price: "600.00",
        },
      ],
    },
    6: {
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
      activities: [],
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

  const handleInputChange = (field, value) => {
    setPackageData((prev) => ({
      ...prev,
      [field]: value,
    }))
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

  const addActivity = () => {
    const newActivity = {
      id: Date.now(),
      title: "",
      description: "",
      price: "0.00",
    }
    handleInputChange("activities", [...(packageData.activities || []), newActivity])
  }

  const updateActivity = (index, field, value) => {
    const updatedActivities = [...packageData.activities]
    updatedActivities[index] = { ...updatedActivities[index], [field]: value }
    handleInputChange("activities", updatedActivities)
  }

  const removeActivity = (index) => {
    const updatedActivities = packageData.activities.filter((_, i) => i !== index)
    handleInputChange("activities", updatedActivities)
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      navigate(`/admin/packages/${id}`)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading package...</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Package not found</h3>
        <p className="mt-1 text-gray-500">The package you're trying to edit doesn't exist.</p>
        <Button onClick={() => navigate("/admin/packages")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <Button variant="outline" onClick={() => navigate(`/admin/packages/${id}`)} className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Edit Package</h1>
            <p className="text-gray-600">{packageData.title}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          <Button variant="outline" onClick={() => navigate(`/admin/packages/${id}`)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Package Images */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
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
                  <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Basic Package Details */}
          <Card>
            <CardHeader>
              <CardTitle>Package Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    value={packageData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      value={packageData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="pr-10"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={packageData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Base Price ($)</Label>
                  <div className="relative">
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={packageData.base_price}
                      onChange={(e) => handleInputChange("base_price", e.target.value)}
                      className="pr-10"
                    />
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={packageData.visibility}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkin">Check-in Date & Time</Label>
                  <div className="relative">
                    <Input
                      id="checkin"
                      type="datetime-local"
                      value={new Date(packageData.check_in_time).toISOString().slice(0, 16)}
                      onChange={(e) => handleInputChange("check_in_time", new Date(e.target.value).toISOString())}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="checkout">Check-out Date & Time</Label>
                  <div className="relative">
                    <Input
                      id="checkout"
                      type="datetime-local"
                      value={new Date(packageData.check_out_time).toISOString().slice(0, 16)}
                      onChange={(e) => handleInputChange("check_out_time", new Date(e.target.value).toISOString())}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="booking-start">Booking Start Date</Label>
                  <Input
                    id="booking-start"
                    type="datetime-local"
                    value={new Date(packageData.booking_start_date).toISOString().slice(0, 16)}
                    onChange={(e) => handleInputChange("booking_start_date", new Date(e.target.value).toISOString())}
                  />
                </div>
                <div>
                  <Label htmlFor="booking-end">Booking End Date</Label>
                  <Input
                    id="booking-end"
                    type="datetime-local"
                    value={new Date(packageData.booking_end_date).toISOString().slice(0, 16)}
                    onChange={(e) => handleInputChange("booking_end_date", new Date(e.target.value).toISOString())}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea
                  id="terms"
                  value={packageData.terms_and_conditions}
                  onChange={(e) => handleInputChange("terms_and_conditions", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="cancellation">Cancellation Policy</Label>
                <Textarea
                  id="cancellation"
                  value={packageData.cancellation_policy}
                  onChange={(e) => handleInputChange("cancellation_policy", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Activities Management */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <CardTitle>Package Activities</CardTitle>
                <Button onClick={addActivity} size="sm" className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {packageData.activities && packageData.activities.length > 0 ? (
                <div className="space-y-4">
                  {packageData.activities.map((activity, index) => (
                    <div key={activity.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Activity {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Activity Title</Label>
                          <Input
                            value={activity.title}
                            onChange={(e) => updateActivity(index, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={activity.price}
                            onChange={(e) => updateActivity(index, "price", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={activity.description}
                          onChange={(e) => updateActivity(index, "description", e.target.value)}
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
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Package Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Package Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active Package</Label>
                <Switch
                  id="active"
                  checked={packageData.is_active}
                  onCheckedChange={(checked) => handleInputChange("is_active", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Package</Label>
                <Switch
                  id="featured"
                  checked={packageData.is_featured}
                  onCheckedChange={(checked) => handleInputChange("is_featured", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="refundable">Refundable</Label>
                <Switch
                  id="refundable"
                  checked={packageData.is_refundable}
                  onCheckedChange={(checked) => handleInputChange("is_refundable", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Save Changes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate(`/admin/packages/${id}`)}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EditPackage
