"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const EditRole = () => {
  const navigate = useNavigate()
  const { roleId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
  })

  const [errors, setErrors] = useState({})

  // Sample data
  const sampleRoles = [
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      is_active: true,
    },
    {
      id: "2",
      name: "Admin",
      description: "Administrative access with most permissions",
      is_active: true,
    },
    {
      id: "3",
      name: "Agent",
      description: "Travel agent with booking and customer management",
      is_active: true,
    },
    {
      id: "4",
      name: "Customer Support",
      description: "Customer service representative with limited access",
      is_active: true,
    },
    {
      id: "5",
      name: "Viewer",
      description: "Read-only access for reporting and analytics",
      is_active: false,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      const foundRole = sampleRoles.find((r) => r.id === roleId)
      if (foundRole) {
        setFormData({
          name: foundRole.name,
          description: foundRole.description,
          is_active: foundRole.is_active,
        })
      }
      setLoading(false)
    }, 1000)
  }, [roleId])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = "Role name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would typically make an API call to update the role
      console.log("Updating role:", formData)

      // Navigate back to role details page
      navigate(`/admin/roles/${roleId}`)
    } catch (error) {
      console.error("Error updating role:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading role data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/roles/${roleId}`)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Role Details</span>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Role</h1>
            <p className="text-sm text-gray-600 mt-1">Update role information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Role Information</span>
            </CardTitle>
            <CardDescription>Update the basic information for this role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {/* Role Name */}
              <div>
                <Label htmlFor="name">Role Name *</Label>
                <div className="relative">
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter role name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter role description"
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>

              <Separator />

              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active Role</Label>
                  <p className="text-sm text-gray-500">Users can be assigned to this role</p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange("is_active", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/admin/roles/${roleId}`)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditRole
