"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Save, Upload, X, Plus, Trash2, Users, Calendar, MapPin, DollarSign, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EditPackage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState([
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ])

  // Mock package data - replace with actual API call
  const [packageData, setPackageData] = useState({
    id: 3,
    title: "Luxury Paris Getaway",
    description: "5-day luxury package with Eiffel Tower access and river cruise",
    base_price: "2999.99",
    check_in_time: "2025-06-01T14:00",
    check_out_time: "2025-06-06T11:00",
    booking_start_date: "2025-05-25T00:00",
    booking_end_date: "2025-05-30T23:59",
    is_active: true,
    is_featured: true,
    is_refundable: true,
    terms_and_conditions: "Non-refundable after 30 days prior to check-in. All guests must provide valid identification upon arrival. Package includes accommodation, specified meals, and listed activities only. Additional services and personal expenses are not covered. Guests are responsible for their own travel insurance. Management reserves the right to modify itinerary due to weather or unforeseen circumstances.",
    cancellation_policy: "Full refund if cancelled 45 days before arrival. 50% refund if cancelled 30-44 days before arrival. 25% refund if cancelled 15-29 days before arrival. No refund if cancelled less than 15 days before arrival. Cancellation fees may apply. In case of force majeure events, alternative dates or full refund will be offered.",
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
        description: "on the mountains",
        price: "500.00",
      },
    ],
  })

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
      alert("Package updated successfully!")
    }, 1000)
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Package Activities" },
    { number: 3, title: "Media & Images" },
    { number: 4, title: "Settings & Policies" }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header with Progress */}
      <div className="p-4 sm:p-6 bg-gray-50 border-b rounded-t-lg">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
          <h2 className="text-lg sm:text-xl font-medium text-gray-900">Edit Package</h2>
          <Button variant="outline" size="sm" className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>
        </div>
        
        {/* Step Progress */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep >= step.number 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:inline ${
                currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Package Information</h3>
            
            {/* Package Title and Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Package Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Luxury Paris Getaway"
                  value={packageData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., 5-day luxury package with Eiffel Tower access and river cruise"
                  value={packageData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 resize-none"
                />
              </div>
            </div>

            {/* Base Price and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-price" className="text-sm font-medium text-gray-700">
                  Base Price ($) *
                </Label>
                <div className="relative">
                  <Input
                    id="base-price"
                    placeholder="e.g., 2999.99"
                    type="number"
                    step="0.01"
                    value={packageData.base_price}
                    onChange={(e) => handleInputChange('base_price', e.target.value)}
                    className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="e.g., Paris, France"
                    value={packageData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Check-in/out Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-in-time" className="text-sm font-medium text-gray-700">
                  Check-in Date & Time *
                </Label>
                <div className="relative">
                  <Input
                    id="check-in-time"
                    type="datetime-local"
                    value={packageData.check_in_time}
                    onChange={(e) => handleInputChange('check_in_time', e.target.value)}
                    className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out-time" className="text-sm font-medium text-gray-700">
                  Check-out Date & Time *
                </Label>
                <div className="relative">
                  <Input
                    id="check-out-time"
                    type="datetime-local"
                    value={packageData.check_out_time}
                    onChange={(e) => handleInputChange('check_out_time', e.target.value)}
                    className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Booking Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-start" className="text-sm font-medium text-gray-700">
                  Booking Start Date *
                </Label>
                <Input
                  id="booking-start"
                  type="datetime-local"
                  value={packageData.booking_start_date}
                  onChange={(e) => handleInputChange('booking_start_date', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-end" className="text-sm font-medium text-gray-700">
                  Booking End Date *
                </Label>
                <Input
                  id="booking-end"
                  type="datetime-local"
                  value={packageData.booking_end_date}
                  onChange={(e) => handleInputChange('booking_end_date', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Package Activities */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <h3 className="text-lg font-medium text-gray-900">Package Activities</h3>
              <Button
                onClick={addActivity}
                size="sm"
                className="flex items-center gap-2 h-8 px-3 text-xs bg-blue-600 text-white hover:bg-blue-700 w-fit"
              >
                <Plus className="w-3 h-3" />
                Add Activity
              </Button>
            </div>

            {/* Existing Activities */}
            {packageData.activities && packageData.activities.length > 0 ? (
              <div className="space-y-4">
                {packageData.activities.map((activity, index) => (
                  <div key={activity.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Activity {index + 1}</h4>
                      <Button
                        onClick={() => removeActivity(index)}
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input
                          placeholder="Activity title"
                          value={activity.title}
                          onChange={(e) => updateActivity(index, "title", e.target.value)}
                          className="bg-white"
                        />
                        <Input
                          placeholder="Price"
                          type="number"
                          step="0.01"
                          value={activity.price}
                          onChange={(e) => updateActivity(index, "price", e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <Textarea
                        placeholder="Activity description"
                        value={activity.description}
                        onChange={(e) => updateActivity(index, "description", e.target.value)}
                        className="bg-white resize-none"
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
        )}

        {/* Step 3: Media & Images */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <h3 className="text-lg font-medium text-gray-900">Package Images</h3>
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
                  <label htmlFor="image-upload" className="cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Add Images
                  </label>
                </Button>
              </div>
            </div>

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
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
                <p className="mt-1 text-sm text-gray-500">Upload images to showcase this package.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Settings & Policies */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings & Policies</h3>

            {/* Package Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Package Settings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <Label htmlFor="is-active" className="text-sm text-gray-600">
                    Active Package
                  </Label>
                  <Switch
                    id="is-active"
                    checked={packageData.is_active}
                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <Label htmlFor="is-featured" className="text-sm text-gray-600">
                    Featured Package
                  </Label>
                  <Switch
                    id="is-featured"
                    checked={packageData.is_featured}
                    onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <Label htmlFor="is-refundable" className="text-sm text-gray-600">
                    Refundable
                  </Label>
                  <Switch
                    id="is-refundable"
                    checked={packageData.is_refundable}
                    onCheckedChange={(checked) => handleInputChange('is_refundable', checked)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Visibility</Label>
                  <Select value={packageData.visibility} onValueChange={(value) => handleInputChange('visibility', value)}>
                    <SelectTrigger className="w-full h-10 bg-gray-50">
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
            </div>

            {/* Terms and Policies - Made Larger */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="terms" className="text-sm font-medium text-gray-700">
                  Terms and Conditions
                </Label>
                <Textarea
                  id="terms"
                  placeholder="Enter detailed terms and conditions for this package. Include information about booking requirements, payment terms, age restrictions, health requirements, included/excluded services, liability limitations, and any other important terms that guests should be aware of before booking."
                  value={packageData.terms_and_conditions}
                  onChange={(e) => handleInputChange('terms_and_conditions', e.target.value)}
                  className="w-full min-h-[200px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellation" className="text-sm font-medium text-gray-700">
                  Cancellation Policy
                </Label>
                <Textarea
                  id="cancellation"
                  placeholder="Define your cancellation policy in detail. Specify refund percentages for different time periods (e.g., 100% refund if cancelled 60+ days before, 50% if cancelled 30-59 days before, no refund if cancelled less than 30 days before). Include any processing fees, force majeure conditions, and special circumstances."
                  value={packageData.cancellation_policy}
                  onChange={(e) => handleInputChange('cancellation_policy', e.target.value)}
                  className="w-full min-h-[200px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  rows={10}
                />
              </div>
            </div>

            {/* Owner Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span>Owner ID: {packageData.owner_id}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-6 border-t border-gray-200 mt-8">
          <div className="flex space-x-2">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 h-8 px-4 text-sm disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-sm border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              Save Draft
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                size="sm"
                className="flex items-center gap-2 h-8 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={saving}
                size="sm"
                className="flex items-center gap-2 h-8 px-4 text-sm bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPackage