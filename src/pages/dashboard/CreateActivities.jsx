"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Clock, Plus, X, HelpCircle, Upload, Shield, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreateActivities() {
  const [activityTitle, setActivityTitle] = useState("")
  const [activityDescription, setActivityDescription] = useState("")
  const [activityPrice, setActivityPrice] = useState("")
  const [selectedPackages, setSelectedPackages] = useState([])
  const [isPackageDropdownOpen, setIsPackageDropdownOpen] = useState(false)
  const [timeSlots, setTimeSlots] = useState([
    {
      id: 1,
      startsAt: "",
      endsAt: "",
    },
  ])

  const availablePackages = [
    { id: 2, title: "Hello", location: "Nigeria" },
    { id: 3, title: "Luxury Paris Getaway", location: "Paris, France" },
    { id: 5, title: "Alaskan Adventure Package", location: "Anchorage, Alaska" },
    { id: 6, title: "Tokyo City Experience", location: "Tokyo, Japan" },
  ]

  const addTimeSlot = () => {
    const newSlot = {
      id: Date.now(),
      startsAt: "",
      endsAt: "",
    }
    setTimeSlots([...timeSlots, newSlot])
  }

  const removeTimeSlot = (id) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
    }
  }

  const updateTimeSlot = (id, field, value) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)))
  }

  const togglePackageSelection = (packageId) => {
    setSelectedPackages((prev) => {
      if (prev.includes(packageId)) {
        return prev.filter((id) => id !== packageId)
      } else {
        return [...prev, packageId]
      }
    })
  }

  const getSelectedPackageNames = () => {
    return selectedPackages
      .map((id) => {
        const pkg = availablePackages.find((p) => p.id === id)
        return pkg ? pkg.title : ""
      })
      .filter(Boolean)
  }

  const handleSave = () => {
    const formattedTimeSlots = timeSlots
      .filter((slot) => slot.startsAt && slot.endsAt)
      .map((slot) => ({
        starts_at: new Date(slot.startsAt).toISOString(),
        ends_at: new Date(slot.endsAt).toISOString(),
      }))

    const activityData = {
      title: activityTitle,
      description: activityDescription,
      price: Number.parseFloat(activityPrice).toFixed(2),
      package_ids: selectedPackages,
      time_slots: formattedTimeSlots,
    }

    console.log("Activity Data (API Ready):", activityData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 bg-gray-50 border-b cursor-pointer"
      >
        <h2 className="text-lg font-medium text-gray-900">Create Activity</h2>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Activity Basic Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity-title" className="text-sm font-medium text-gray-700">
              Title *
            </Label>
            <Input
              id="activity-title"
              placeholder="e.g., Swimming, Hiking, City Tour"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md bg-gray-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-description" className="text-sm font-medium text-gray-700">
              Description *
            </Label>
            <Textarea
              id="activity-description"
              placeholder="Describe your activity in detail..."
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50 resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-price" className="text-sm font-medium text-gray-700">
              Price *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="activity-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={activityPrice}
                onChange={(e) => setActivityPrice(e.target.value)}
                className="w-full h-10 pl-8 pr-3 border border-gray-300 rounded-md bg-gray-50"
                required
              />
            </div>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="border-t border-gray-200 pt-4 sm:pt-6">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-md font-medium text-gray-900">Time Slots *</h3>
              <HelpCircle className="w-4 h-4 text-gray-400" title="Define when this activity is available" />
            </div>
            <Button
              onClick={addTimeSlot}
              size="sm"
              className="flex items-center gap-2 h-8 px-3 text-xs bg-gray-900 text-white hover:bg-gray-800 w-fit"
            >
              <Plus className="w-3 h-3" />
              Add Time Slot
            </Button>
          </div>

          {/* Time Slots */}
          <div className="space-y-4">
            {timeSlots.map((slot, index) => (
              <div key={slot.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Time Slot {index + 1}</h4>
                  {timeSlots.length > 1 && (
                    <Button
                      onClick={() => removeTimeSlot(slot.id)}
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0 border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">Start Time *</Label>
                    <div className="relative">
                      <Input
                        type="datetime-local"
                        value={slot.startsAt}
                        onChange={(e) => updateTimeSlot(slot.id, "startsAt", e.target.value)}
                        className="w-full h-9 px-3 border border-gray-300 rounded-md bg-white text-sm"
                        required
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-600">End Time *</Label>
                    <div className="relative">
                      <Input
                        type="datetime-local"
                        value={slot.endsAt}
                        onChange={(e) => updateTimeSlot(slot.id, "endsAt", e.target.value)}
                        className="w-full h-9 px-3 border border-gray-300 rounded-md bg-white text-sm"
                        required
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Data Preview */}
        {(activityTitle || activityDescription || activityPrice || selectedPackages.length > 0) && (
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">API Data Preview</h3>
            <div className="p-3 bg-gray-100 rounded-md text-xs font-mono overflow-x-auto">
              <pre className="whitespace-pre-wrap text-gray-700">
                {JSON.stringify(
                  {
                    title: activityTitle || "Activity title...",
                    description: activityDescription || "Activity description...",
                    price: activityPrice ? Number.parseFloat(activityPrice).toFixed(2) : "0.00",
                    package_ids: selectedPackages,
                    time_slots: timeSlots
                      .filter((slot) => slot.startsAt && slot.endsAt)
                      .map((slot) => ({
                        starts_at: slot.startsAt ? new Date(slot.startsAt).toISOString() : "",
                        ends_at: slot.endsAt ? new Date(slot.endsAt).toISOString() : "",
                      })),
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        )}

        {/* Bottom Options */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Privacy: Public</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 h-8 px-3 text-xs bg-gray-900 text-white border-gray-900 hover:bg-gray-800 w-fit"
            >
              <Upload className="w-3 h-3" />
              Upload Images
            </Button>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsPackageDropdownOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              className="flex items-center gap-2 h-8 px-4 text-sm bg-gray-900 text-white hover:bg-gray-800"
              disabled={
                !activityTitle ||
                !activityDescription ||
                !activityPrice ||
                timeSlots.some((slot) => !slot.startsAt || !slot.endsAt)
              }
            >
              <Save className="w-3 h-3" />
              Create Activity
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
