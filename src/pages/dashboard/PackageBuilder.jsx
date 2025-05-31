"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, MapPin, Shield, Upload, Plus, X, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function PackageBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({ title: "", description: "", price: "" })
  const [isAddingActivity, setIsAddingActivity] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    basePrice: "",
    location: "",
    agentAddonPrice: "",
    agentPriceType: "",
    checkInTime: "",
    checkOutTime: "",
    isActive: false,
    isFeatured: false,
    isRefundable: false,
    visibility: "public",
    terms: "",
    cancellation: ""
  })

  const addActivity = () => {
    if (newActivity.title && newActivity.description && newActivity.price) {
      setActivities([...activities, { ...newActivity, id: Date.now() }])
      setNewActivity({ title: "", description: "", price: "" })
      setIsAddingActivity(false)
    }
  }

  const removeActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps = [
    { number: 1, title: "Basic Information" },
    { number: 2, title: "Package Activities" },
    { number: 3, title: "Settings & Policies" }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header with Progress */}
      <div className="p-4 sm:p-6 bg-gray-50 border-b rounded-t-lg">
        <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">Travel Package Builder</h2>
        
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
                  value={formData.title}
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
                  value={formData.description}
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
                <Input
                  id="base-price"
                  placeholder="e.g., 2999.99"
                  type="number"
                  step="0.01"
                  value={formData.basePrice}
                  onChange={(e) => handleInputChange('basePrice', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="e.g., Paris, France"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Agent Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agent-addon-price" className="text-sm font-medium text-gray-700">
                  Agent Addon Price ($) *
                </Label>
                <Input
                  id="agent-addon-price"
                  placeholder="e.g., 299.99"
                  type="number"
                  step="0.01"
                  value={formData.agentAddonPrice}
                  onChange={(e) => handleInputChange('agentAddonPrice', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Agent Price Type *</Label>
                <Select value={formData.agentPriceType} onValueChange={(value) => handleInputChange('agentPriceType', value)}>
                  <SelectTrigger className="w-full h-10 bg-gray-50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Check-in/out Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="check-in-time" className="text-sm font-medium text-gray-700">
                  Check-in Time *
                </Label>
                <Input
                  id="check-in-time"
                  type="time"
                  value={formData.checkInTime}
                  onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out-time" className="text-sm font-medium text-gray-700">
                  Check-out Time *
                </Label>
                <Input
                  id="check-out-time"
                  type="time"
                  value={formData.checkOutTime}
                  onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
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
                onClick={() => setIsAddingActivity(true)}
                size="sm"
                className="flex items-center gap-2 h-8 px-3 text-xs bg-blue-600 text-white hover:bg-blue-700 w-fit"
              >
                <Plus className="w-3 h-3" />
                Add Activity
              </Button>
            </div>

            {/* Existing Activities */}
            {activities.length === 0 && !isAddingActivity && (
              <div className="text-center py-8 text-gray-500">
                <p>No activities added yet. Click "Add Activity" to get started.</p>
              </div>
            )}

            {activities.map((activity) => (
              <div key={activity.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-sm font-medium text-green-600 mt-2">${activity.price}</p>
                  </div>
                  <Button
                    onClick={() => removeActivity(activity.id)}
                    variant="outline"
                    size="sm"
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 self-start sm:ml-2"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Activity Form */}
            {isAddingActivity && (
              <div className="p-4 border border-blue-200 rounded-md bg-blue-50">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="Activity title (e.g., Swimming)"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      className="bg-white"
                    />
                    <Input
                      placeholder="Price (e.g., 600.00)"
                      type="number"
                      step="0.01"
                      value={newActivity.price}
                      onChange={(e) => setNewActivity({ ...newActivity, price: e.target.value })}
                      className="bg-white"
                    />
                  </div>
                  <Textarea
                    placeholder="Activity description (e.g., going swimming at the beach)"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="bg-white resize-none"
                    rows={2}
                  />
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button
                      onClick={addActivity}
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
                    >
                      Add Activity
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingActivity(false)
                        setNewActivity({ title: "", description: "", price: "" })
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Settings & Policies */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings & Policies</h3>

            {/* Package Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Package Settings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is-active" 
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                  />
                  <Label htmlFor="is-active" className="text-sm text-gray-600">
                    Active Package
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is-featured" 
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                  />
                  <Label htmlFor="is-featured" className="text-sm text-gray-600">
                    Featured Package
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is-refundable" 
                    checked={formData.isRefundable}
                    onCheckedChange={(checked) => handleInputChange('isRefundable', checked)}
                  />
                  <Label htmlFor="is-refundable" className="text-sm text-gray-600">
                    Refundable
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Visibility</Label>
                  <Select value={formData.visibility} onValueChange={(value) => handleInputChange('visibility', value)}>
                    <SelectTrigger className="w-full h-10 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Terms and Policies */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="terms" className="text-sm font-medium text-gray-700">
                  Terms and Conditions
                </Label>
                <Textarea
                  id="terms"
                  placeholder="Enter detailed terms and conditions for this package. Include information about booking requirements, payment terms, age restrictions, health requirements, included/excluded services, liability limitations, and any other important terms that guests should be aware of before booking."
                  value={formData.terms}
                  onChange={(e) => handleInputChange('terms', e.target.value)}
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellation" className="text-sm font-medium text-gray-700">
                  Cancellation Policy
                </Label>
                <Textarea
                  id="cancellation"
                  placeholder="Define your cancellation policy in detail. Specify refund percentages for different time periods (e.g., 100% refund if cancelled 60+ days before, 50% if cancelled 30-59 days before, no refund if cancelled less than 30 days before). Include any processing fees, force majeure conditions, and special circumstances."
                  value={formData.cancellation}
                  onChange={(e) => handleInputChange('cancellation', e.target.value)}
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  rows={6}
                />
              </div>
            </div>

            {/* Upload Media */}
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 h-8 px-3 text-xs bg-gray-900 text-white border-gray-900 hover:bg-gray-800 w-fit"
              >
                <Upload className="w-3 h-3" />
                Upload Media
              </Button>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span>Owner ID: Auto-assigned</span>
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
            
            {currentStep < 3 ? (
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
                size="sm"
                className="h-8 px-4 text-sm bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
              >
                Create Package
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}