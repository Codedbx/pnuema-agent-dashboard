"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Package,
  ImageIcon,
  Download,
  Share2,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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

const ActivityDetails = () => {
  const { packageId, activityId } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock API data - in real app, fetch based on packageId and activityId
  const apiData = {
    status: "success",
    data: [
      {
        id: 3,
        title: "Luxury Paris Getaway",
        description: "5-day luxury package with Eiffel Tower access and river cruise",
        base_price: "2999.99",
        location: "Paris, France",
        is_active: true,
        is_featured: true,
        activities: [
          {
            id: 2,
            title: "Swimming",
            description:
              "going swimming at the beach with professional instructors. This activity includes all necessary equipment and safety gear. Perfect for beginners and experienced swimmers alike.",
            price: "600.00",
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
          {
            id: 1,
            title: "hiking",
            description: "on the mountiains",
            price: "500.00",
            media: [{ id: 5, url: "/placeholder.svg?height=400&width=600", type: "image", name: "Mountain Trail" }],
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
    ],
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const pkg = apiData.data.find((p) => p.id === Number.parseInt(packageId))
      if (pkg) {
        const foundActivity = pkg.activities.find((a) => a.id === Number.parseInt(activityId))
        if (foundActivity) {
          setActivity({
            ...foundActivity,
            packageTitle: pkg.title,
            packageId: pkg.id,
            packageLocation: pkg.location,
            packagePrice: pkg.base_price,
            isActive: pkg.is_active,
            isFeatured: pkg.is_featured,
          })
        }
      }
      setLoading(false)
    }, 500)
  }, [packageId, activityId])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price) => {
    return `$${Number.parseFloat(price).toFixed(2)}`
  }

  const calculateDuration = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffInHours = Math.round((endDate - startDate) / (1000 * 60 * 60))
    return diffInHours > 24 ? `${Math.round(diffInHours / 24)} days` : `${diffInHours} hours`
  }

  const handleEdit = () => {
    navigate(`/admin/activities/${packageId}/${activityId}/edit`)
  }

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting activity:", activityId)
    navigate("/admin/activities")
  }

  const getStatusBadge = () => {
    if (activity?.isFeatured) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Featured
        </Badge>
      )
    }
    if (activity?.isActive) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Active
        </Badge>
      )
    }
    return <Badge variant="secondary">Inactive</Badge>
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
          <p className="text-gray-600 mt-2">The activity you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/admin/activities")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <Button variant="outline" onClick={() => navigate("/admin/activities")} className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{activity.title}</h1>
            <p className="text-sm text-gray-600 mt-1">Activity Details</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleEdit} className="flex-1 sm:flex-none">
            <Edit className="w-4 h-4 mr-2" />
            Edit Activity
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1 sm:flex-none">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this activity? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Activity Overview */}
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <CardTitle>Activity Overview</CardTitle>
                {getStatusBadge()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{activity.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-medium">{formatPrice(activity.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Time Slots</p>
                    <p className="font-medium">{activity.time_slots?.length || 0} available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          {activity.media && activity.media.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Activity Images ({activity.media.length})
                </CardTitle>
                <CardDescription>Images associated with this activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activity.media.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.name || `Activity image ${image.id}`}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(image.url, "_blank")}
                        >
                          View Full Size
                        </Button>
                      </div>
                      {image.name && <p className="text-sm text-gray-600 mt-2 text-center">{image.name}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Time Slots */}
          {activity.time_slots && activity.time_slots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>Scheduled times for this activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activity.time_slots.map((slot, index) => (
                    <div key={slot.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-2">
                        <h4 className="font-medium text-gray-900">Time Slot {index + 1}</h4>
                        <Badge variant="outline">{calculateDuration(slot.starts_at, slot.ends_at)}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Starts</p>
                          <p className="font-medium break-words">{formatDate(slot.starts_at)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ends</p>
                          <p className="font-medium break-words">{formatDate(slot.ends_at)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Package Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Package Name</p>
                <p className="font-medium">{activity.packageTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <p className="font-medium">{activity.packageLocation}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Package Base Price</p>
                <p className="font-medium">{formatPrice(activity.packagePrice)}</p>
              </div>
              <Separator />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/admin/packages/${activity.packageId}`)}
              >
                View Package Details
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Activity ID</span>
                <span className="font-medium">#{activity.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Package ID</span>
                <span className="font-medium">#{activity.packageId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Images</span>
                <span className="font-medium">{activity.media?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Time Slots</span>
                <span className="font-medium">{activity.time_slots?.length || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ActivityDetails
