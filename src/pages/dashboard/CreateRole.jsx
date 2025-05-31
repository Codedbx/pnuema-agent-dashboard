"use client"

import { useState } from "react"
import { ArrowLeft, Save, Shield, Users, Settings, Eye, Edit, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const CreateRole = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [permissionSearch, setPermissionSearch] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    guardName: "web",
    description: "",
    is_active: true,
    permissions: []
  })

  const [errors, setErrors] = useState({})

  // Sample permissions organized by category
  const availablePermissions = [
    {
      category: "User Management",
      icon: Users,
      permissions: [
        { id: "users.view", name: "View Users", description: "Can view user listings and profiles" },
        { id: "users.create", name: "Create Users", description: "Can create new user accounts" },
        { id: "users.edit", name: "Edit Users", description: "Can modify user information" },
        { id: "users.delete", name: "Delete Users", description: "Can delete user accounts" },
        { id: "users.assign-roles", name: "Assign Roles", description: "Can assign roles to users" }
      ]
    },
    {
      category: "Role Management",
      icon: Shield,
      permissions: [
        { id: "roles.view", name: "View Roles", description: "Can view role listings" },
        { id: "roles.create", name: "Create Roles", description: "Can create new roles" },
        { id: "roles.edit", name: "Edit Roles", description: "Can modify role information" },
        { id: "roles.delete", name: "Delete Roles", description: "Can delete roles" },
        { id: "roles.assign-permissions", name: "Assign Permissions", description: "Can assign permissions to roles" }
      ]
    },
    {
      category: "Content Management",
      icon: Edit,
      permissions: [
        { id: "content.view", name: "View Content", description: "Can view content listings" },
        { id: "content.create", name: "Create Content", description: "Can create new content" },
        { id: "content.edit", name: "Edit Content", description: "Can modify existing content" },
        { id: "content.delete", name: "Delete Content", description: "Can delete content" },
        { id: "content.publish", name: "Publish Content", description: "Can publish/unpublish content" }
      ]
    },
    {
      category: "System Settings",
      icon: Settings,
      permissions: [
        { id: "settings.view", name: "View Settings", description: "Can view system settings" },
        { id: "settings.edit", name: "Edit Settings", description: "Can modify system settings" },
        { id: "settings.backup", name: "System Backup", description: "Can create and restore backups" },
        { id: "settings.logs", name: "View Logs", description: "Can view system logs" }
      ]
    },
    {
      category: "Reports & Analytics",
      icon: Eye,
      permissions: [
        { id: "reports.view", name: "View Reports", description: "Can view system reports" },
        { id: "reports.export", name: "Export Reports", description: "Can export report data" },
        { id: "analytics.view", name: "View Analytics", description: "Can view analytics dashboard" },
        { id: "analytics.advanced", name: "Advanced Analytics", description: "Can access advanced analytics features" }
      ]
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "Role name is required"
    if (!formData.guardName.trim()) newErrors.guardName = "Guard name is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const handleCategoryToggle = (categoryPermissions) => {
    const categoryIds = categoryPermissions.map(p => p.id)
    const allSelected = categoryIds.every(id => formData.permissions.includes(id))
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(id => !categoryIds.includes(id))
        : [...new Set([...prev.permissions, ...categoryIds])]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Creating role:", formData)
      // navigate("/admin/role-management")
      console.log("Role created successfully")
    } catch (error) {
      console.error("Error creating role:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredPermissions = availablePermissions.map(category => ({
    ...category,
    permissions: category.permissions.filter(permission =>
      permission.name.toLowerCase().includes(permissionSearch.toLowerCase()) ||
      permission.description.toLowerCase().includes(permissionSearch.toLowerCase()) ||
      category.category.toLowerCase().includes(permissionSearch.toLowerCase())
    )
  })).filter(category => category.permissions.length > 0)

  const totalPermissions = availablePermissions.reduce((sum, cat) => sum + cat.permissions.length, 0)
  const selectedPermissions = formData.permissions.length

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Navigate back")}
            className="flex items-center space-x-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roles</span>
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Create New Role</h1>
            <p className="text-sm text-gray-600 mt-1">Define a new role with specific permissions for the system</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {selectedPermissions} of {totalPermissions} permissions selected
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Role Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Shield className="w-5 h-5" />
              <span>Role Information</span>
            </CardTitle>
            <CardDescription>Enter the basic information for this role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role Name */}
              <div>
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter role name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Guard Name */}
              <div>
                <Label htmlFor="guardName">Guard Name *</Label>
                <Select value={formData.guardName} onValueChange={(value) => handleInputChange("guardName", value)}>
                  <SelectTrigger className={errors.guardName ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select guard name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">web</SelectItem>
                    <SelectItem value="api">api</SelectItem>
                  </SelectContent>
                </Select>
                {errors.guardName && <p className="text-sm text-red-600 mt-1">{errors.guardName}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter role description"
                rows={3}
              />
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
          </CardContent>
        </Card>

        {/* Permissions Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Shield className="w-5 h-5" />
                  <span>Role Permissions</span>
                </CardTitle>
                <CardDescription>Configure what this role can access and perform</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, permissions: [] }))}
                >
                  Clear All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    permissions: availablePermissions.flatMap(cat => cat.permissions.map(p => p.id))
                  }))}
                >
                  Select All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search permissions..."
                value={permissionSearch}
                onChange={(e) => setPermissionSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Permission Categories */}
            <div className="space-y-6">
              {filteredPermissions.map((category) => {
                const categoryPermissionIds = category.permissions.map(p => p.id)
                const selectedInCategory = categoryPermissionIds.filter(id => formData.permissions.includes(id)).length
                const allSelected = selectedInCategory === categoryPermissionIds.length
                const someSelected = selectedInCategory > 0 && selectedInCategory < categoryPermissionIds.length

                const IconComponent = category.icon

                return (
                  <div key={category.category} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{category.category}</h3>
                          <p className="text-sm text-gray-500">
                            {selectedInCategory} of {categoryPermissionIds.length} permissions selected
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={allSelected}
                          ref={(el) => el && (el.indeterminate = someSelected)}
                          onCheckedChange={() => handleCategoryToggle(category.permissions)}
                        />
                        <Label className="text-sm font-medium">
                          {allSelected ? "Deselect All" : "Select All"}
                        </Label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className={`flex items-start space-x-3 p-3 rounded-md border transition-colors ${
                            formData.permissions.includes(permission.id)
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <Checkbox
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <Label
                              className="text-sm font-medium cursor-pointer"
                              onClick={() => handlePermissionToggle(permission.id)}
                            >
                              {permission.name}
                            </Label>
                            <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredPermissions.length === 0 && (
              <div className="text-center py-8">
                <Shield className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No permissions found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => console.log("Cancel")}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button type="button" disabled={isSubmitting} onClick={handleSubmit} className="w-full sm:w-auto">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating Role...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Role
              </>
            )}
          </Button>
        </div>
    </div>
    </div>
  )
}

export default CreateRole