// EditActivity.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Plus, X, Upload, Trash2, Calendar, Clock, HelpCircle, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"

const EditActivity = () => {
  const { activityId } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [timeSlots, setTimeSlots] = useState([])
  const [images, setImages] = useState([])
  const [location, setLocation] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)

  // Mock API data (simplified without packages)
  const apiData = {
    status: "success",
    data: [
      {
        id: 2,
        title: "Swimming",
        description:
          "going swimming at the beach with professional instructors. This activity includes all necessary equipment and safety gear.",
        price: "600.00",
        location: "Paris, France",
        is_active: true,
        is_featured: true,
        media: [
          { id: 3, url: "/placeholder.svg?height=400&width=600", type: "image", name: "Swimming Pool" },
          { id: 4, url: "/placeholder.svg?height=400&width=600", type: "image", name: "Beach View" },
          { id: 5, url: "/placeholder.svg?height=400&width=600", type: "image", name: "Equipment" },
        ],
        time_slots: [
          {
            id: 1,
            starts_at: "2025-05-25T17:34:32.000000Z",
            ends_at: "2025-05-25T19:34:32.000000Z",
          },
          {
            id: 2,
            starts_at: "2025-05-28T16:34:59.000000Z",
            ends_at: "2025-05-28T18:34:59.000000Z",
          },
        ],
      },
    ],
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundActivity = apiData.data.find(a => a.id === Number.parseInt(activityId))
      if (foundActivity) {
        setActivity(foundActivity)
        setTitle(foundActivity.title)
        setDescription(foundActivity.description)
        setPrice(foundActivity.price)
        setLocation(foundActivity.location)
        setIsActive(foundActivity.is_active)
        setIsFeatured(foundActivity.is_featured)
        setTimeSlots(foundActivity.time_slots || [])
        setImages(foundActivity.media || [])
      }
      setLoading(false)
    }, 500)
  }, [activityId])

  const addTimeSlot = () => {
    const newSlot = {
      id: Date.now(),
      starts_at: new Date().toISOString(),
      ends_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
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

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          url: e.target.result,
          type: "image",
          name: file.name,
          file: file,
        }
        setImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (imageId) => {
    setImages(images.filter((img) => img.id !== imageId))
  }

  const calculateDuration = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffInHours = Math.round((endDate - startDate) / (1000 * 60 * 60))
    return diffInHours > 24 ? `${Math.round(diffInHours / 24)} days` : `${diffInHours} hours`
  }

  const handleSave = async () => {
    setSaving(true)

    // Format data for API
    const updatedActivity = {
      title,
      description,
      location,
      is_active: isActive,
      is_featured: isFeatured,
      price: Number.parseFloat(price).toFixed(2),
      time_slots: timeSlots.map((slot) => ({
        id: slot.id,
        starts_at: new Date(slot.starts_at).toISOString(),
        ends_at: new Date(slot.ends_at).toISOString(),
      })),
      media: images.map((img) => ({
        id: img.id,
        url: img.url,
        type: img.type,
        name: img.name,
      })),
    }

    console.log("Updated Activity Data:", updatedActivity)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      navigate(`/admin/activities/${activityId}`)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Activity Not Found</h2>
          <p className="text-gray-600 mt-2">The activity you're trying to edit doesn't exist.</p>
          <Button onClick={() => navigate("/admin/activities")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/activities/${activityId}`)}
            className="w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Edit Activity</h1>
            <p className="text-sm text-gray-600 mt-1">Make changes to the activity details</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/activities/${activityId}`)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the core details of your activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Activity Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Swimming, Hiking, City Tour"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-8"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Paris, France"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your activity in detail..."
                className="min-h-[100px] resize-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-active" 
                  checked={isActive} 
                  onCheckedChange={(checked) => setIsActive(checked)} 
                />
                <Label htmlFor="is-active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-featured" 
                  checked={isFeatured} 
                  onCheckedChange={(checked) => setIsFeatured(checked)} 
                />
                <Label htmlFor="is-featured">Featured</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="w-5 h-5 mr-2" />
              Activity Images
            </CardTitle>
            <CardDescription>
              Upload and manage images for this activity. Images help customers understand what to expect.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name || `Activity image ${image.id}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Image</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this image? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeImage(image.id)}
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    {image.name && <p className="text-sm text-gray-600 mt-2 text-center truncate">{image.name}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Slots Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Time Slots
                </CardTitle>
                <CardDescription>Define when this activity is available for booking</CardDescription>
              </div>
              <Button onClick={addTimeSlot} size="sm" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Time Slot
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {timeSlots.length > 0 ? (
              <div className="space-y-4">
                {timeSlots.map((slot, index) => (
                  <div key={slot.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">Time Slot {index + 1}</h4>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{calculateDuration(slot.starts_at, slot.ends_at)}</span>
                        </div>
                      </div>
                      {timeSlots.length > 1 && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove Time Slot</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                              <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => removeTimeSlot(slot.id)}
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                              >
                                Remove
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-${slot.id}`}>Start Date & Time *</Label>
                        <Input
                          id={`start-${slot.id}`}
                          type="datetime-local"
                          value={new Date(slot.starts_at).toISOString().slice(0, 16)}
                          onChange={(e) => updateTimeSlot(slot.id, "starts_at", new Date(e.target.value).toISOString())}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`end-${slot.id}`}>End Date & Time *</Label>
                        <Input
                          id={`end-${slot.id}`}
                          type="datetime-local"
                          value={new Date(slot.ends_at).toISOString().slice(0, 16)}
                          onChange={(e) => updateTimeSlot(slot.id, "ends_at", new Date(e.target.value).toISOString())}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Clock className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No time slots</h3>
                <p className="mt-1 text-sm text-gray-500">Add time slots to schedule this activity.</p>
                <Button onClick={addTimeSlot} className="mt-4" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Time Slot
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              API Data Preview
            </CardTitle>
            <CardDescription>Preview of the data that will be sent to the API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-md p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    title: title || "Activity title...",
                    description: description || "Activity description...",
                    location: location || "Location...",
                    is_active: isActive,
                    is_featured: isFeatured,
                    price: price ? Number.parseFloat(price).toFixed(2) : "0.00",
                    time_slots: timeSlots.map((slot) => ({
                      id: slot.id,
                      starts_at: slot.starts_at,
                      ends_at: slot.ends_at,
                    })),
                    media: images.map((img) => ({
                      id: img.id,
                      url: img.url,
                      type: img.type,
                      name: img.name,
                    })),
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditActivity