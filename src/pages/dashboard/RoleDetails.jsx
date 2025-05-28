"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Shield, Calendar, Clock, Users, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const RoleDetails = () => {
  const navigate = useNavigate()
  const { roleId } = useParams()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Sample data
  const sampleRoles = [
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      color: "bg-red-100 text-red-800",
      createdAt: "2024-01-15",
      updatedAt: "2024-05-20",
      status: "active",
      users: [
        { id: 1, name: "John Smith", email: "john@example.com" },
        { id: 2, name: "Sarah Johnson", email: "sarah@example.com" },
      ],
    },
    {
      id: "2",
      name: "Admin",
      description: "Administrative access with most permissions",
      userCount: 5,
      color: "bg-blue-100 text-blue-800",
      createdAt: "2024-01-20",
      updatedAt: "2024-05-18",
      status: "active",
      users: [
        { id: 3, name: "Mike Davis", email: "mike@example.com" },
        { id: 4, name: "Lisa Wilson", email: "lisa@example.com" },
        { id: 5, name: "Tom Brown", email: "tom@example.com" },
      ],
    },
    {
      id: "3",
      name: "Agent",
      description: "Travel agent with booking and customer management",
      userCount: 15,
      color: "bg-green-100 text-green-800",
      createdAt: "2024-02-01",
      updatedAt: "2024-05-15",
      status: "active",
      users: [
        { id: 6, name: "Alex Johnson", email: "alex@example.com" },
        { id: 7, name: "Emma White", email: "emma@example.com" },
      ],
    },
    {
      id: "4",
      name: "Customer Support",
      description: "Customer service representative with limited access",
      userCount: 8,
      color: "bg-purple-100 text-purple-800",
      createdAt: "2024-02-10",
      updatedAt: "2024-05-10",
      status: "active",
      users: [
        { id: 8, name: "David Lee", email: "david@example.com" },
        { id: 9, name: "Sophie Chen", email: "sophie@example.com" },
      ],
    },
    {
      id: "5",
      name: "Viewer",
      description: "Read-only access for reporting and analytics",
      userCount: 3,
      color: "bg-gray-100 text-gray-800",
      createdAt: "2024-02-15",
      updatedAt: "2024-05-05",
      status: "inactive",
      users: [
        { id: 10, name: "Ryan Miller", email: "ryan@example.com" },
        { id: 11, name: "Olivia Garcia", email: "olivia@example.com" },
      ],
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      const foundRole = sampleRoles.find((r) => r.id === roleId)
      setRole(foundRole || null)
      setLoading(false)
    }, 1000)
  }, [roleId])

  const handleDelete = () => {
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    // Here you would make an API call to delete the role
    console.log("Deleting role:", roleId)
    setShowDeleteDialog(false)
    navigate("/admin/role-management")
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading role details...</span>
        </div>
      </div>
    )
  }

  if (!role) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/role-management")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roles</span>
          </Button>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Role not found</h3>
          <p className="mt-1 text-gray-500">The role you're looking for doesn't exist or has been deleted.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/role-management")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roles</span>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Role Details</h1>
            <p className="text-sm text-gray-600 mt-1">View detailed information about this role</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate(`/admin/roles/${roleId}/edit`)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Role
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Role
          </Button>
        </div>
      </div>

      {/* Role Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${role.color} rounded-lg flex items-center justify-center`}>
              <Shield className="w-4 h-4" />
            </div>
            <span>{role.name}</span>
            <Badge
              variant="secondary"
              className={role.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            >
              {role.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
          <CardDescription>{role.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="mt-1 flex items-center text-sm text-gray-900">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  {role.createdAt}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="mt-1 flex items-center text-sm text-gray-900">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  {role.updatedAt}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1 flex items-center text-sm text-gray-900">
                  {role.status === "active" ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Active - This role can be assigned to users
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Inactive - This role cannot be assigned to users
                    </>
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Users Assigned</h3>
                <p className="mt-1 flex items-center text-sm text-gray-900">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  {role.userCount} users have this role
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users with this Role */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Users with this Role</span>
          </CardTitle>
          <CardDescription>Users currently assigned to this role</CardDescription>
        </CardHeader>
        <CardContent>
          {role.users && role.users.length > 0 ? (
            <div className="border rounded-lg divide-y">
              {role.users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View User
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users assigned</h3>
              <p className="mt-1 text-sm text-gray-500">This role has not been assigned to any users yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{role.name}" role? This action cannot be undone and may affect users
              assigned to this role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RoleDetails
