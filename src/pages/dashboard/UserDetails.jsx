"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Building,
  CreditCard,
  MapPin,
  Clock,
  Users,
  Shield,
  Crown,
  Eye,
  Share2,
  Download,
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

const UserDetails = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock user data (removed permissions and department)
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "admin",
      phone: "+1 (555) 123-4567",
      is_active: true,
      last_login: "2025-01-28T10:30:00.000000Z",
      created_at: "2024-01-15T09:00:00.000000Z",
      notes: "System administrator with full access to all features and settings.",
      business_name: "Tech Solutions Inc",
      cac_reg_no: "RC123456",
      address: "123 Tech Street, Silicon Valley, CA 94000",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "manager",
      phone: "+1 (555) 234-5678",
      is_active: true,
      last_login: "2025-01-28T14:15:00.000000Z",
      created_at: "2024-02-20T11:30:00.000000Z",
      notes: "Sales team manager with extensive experience in customer relations.",
      business_name: "Sales Pro Ltd",
      cac_reg_no: "RC234567",
      address: "456 Business Ave, New York, NY 10001",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "user",
      phone: "+1 (555) 345-6789",
      is_active: true,
      last_login: "2025-01-27T16:45:00.000000Z",
      created_at: "2024-03-10T14:20:00.000000Z",
      notes: "Marketing specialist focused on digital campaigns and social media.",
      business_name: "Creative Marketing Co",
      cac_reg_no: "RC345678",
      address: "789 Creative Blvd, Los Angeles, CA 90210",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers.find((u) => u.id === Number.parseInt(userId))
      setUser(foundUser)
      setLoading(false)
    }, 500)
  }, [userId])

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

  const handleEdit = () => {
    navigate(`/admin/users/${userId}/edit`)
  }

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting user:", userId)
    navigate("/admin/user-access")
  }

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: "bg-red-100 text-red-800", icon: Crown, text: "Administrator" },
      manager: { color: "bg-blue-100 text-blue-800", icon: Shield, text: "Manager" },
      user: { color: "bg-green-100 text-green-800", icon: Users, text: "User" },
      viewer: { color: "bg-gray-100 text-gray-800", icon: Eye, text: "Viewer" },
    }

    const config = roleConfig[role] || roleConfig.user
    const IconComponent = config.icon

    return (
      <Badge variant="secondary" className={config.color}>
        <IconComponent className="w-4 h-4 mr-2" />
        {config.text}
      </Badge>
    )
  }

  const getStatusBadge = (isActive) => {
    return isActive ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        Active
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        Inactive
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">User Not Found</h2>
          <p className="text-gray-600 mt-2">The user you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/admin/user-access")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/admin/user-access")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-600 mt-1">User Profile Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit User
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this user? This action cannot be undone and will remove all associated
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Overview</CardTitle>
                <div className="flex items-center space-x-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.is_active)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    {user.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Business Information</h4>
                  <div className="space-y-3">
                    {user.business_name && (
                      <div className="flex items-center space-x-3">
                        <Building className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Business Name</p>
                          <p className="font-medium">{user.business_name}</p>
                        </div>
                      </div>
                    )}
                    {user.cac_reg_no && (
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">CAC Reg. No</p>
                          <p className="font-medium">{user.cac_reg_no}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              {user.address && (
                <>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Notes */}
              {user.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-700">{user.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Activity Timeline
              </CardTitle>
              <CardDescription>Recent user activity and login history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Last Login</p>
                    <p className="text-xs text-gray-600">
                      {user.last_login ? formatDate(user.last_login) : "Never logged in"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Account Created</p>
                    <p className="text-xs text-gray-600">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Reset Password
              </Button>
              <Separator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this user? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* User Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">User ID</span>
                <span className="font-medium">#{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Role</span>
                <span className="font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="font-medium">{user.is_active ? "Active" : "Inactive"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="font-medium">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Role Information */}
          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Role</span>
                  {getRoleBadge(user.role)}
                </div>
                <div className="text-xs text-gray-500">
                  {user.role === "admin" && "Full system access with all administrative privileges"}
                  {user.role === "manager" && "Management access with team oversight capabilities"}
                  {user.role === "user" && "Standard user access with basic functionality"}
                  {user.role === "viewer" && "Read-only access to view information"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
