"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Building, Mail, Phone, CreditCard, Users, Shield, Crown, Eye, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const EditUser = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state (removed permissions and department)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    business_name: "",
    cac_reg_no: "",
    address: "",
    is_active: true,
    notes: "",
  })

  const [errors, setErrors] = useState({})

  // Mock user data
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
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers.find((u) => u.id === Number.parseInt(userId))
      if (foundUser) {
        setUser(foundUser)
        setFormData({
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          phone: foundUser.phone || "",
          business_name: foundUser.business_name || "",
          cac_reg_no: foundUser.cac_reg_no || "",
          address: foundUser.address || "",
          is_active: foundUser.is_active,
          notes: foundUser.notes || "",
        })
      }
      setLoading(false)
    }, 500)
  }, [userId])

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
    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email address is required"
    if (!formData.role) newErrors.role = "Role is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation (if provided)
    if (formData.phone && !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Updated User Data:", formData)

      // Navigate back to user details
      navigate(`/admin/users/${userId}`)
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      setSaving(false)
    }
  }

  const getRoleIcon = (role) => {
    const icons = {
      admin: Crown,
      manager: Shield,
      user: Users,
      viewer: Eye,
    }
    return icons[role] || Users
  }

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-blue-100 text-blue-800",
      user: "bg-green-100 text-green-800",
      viewer: "bg-gray-100 text-gray-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
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
          <p className="text-gray-600 mt-2">The user you're trying to edit doesn't exist.</p>
          <Button onClick={() => navigate("/admin/user-access")} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate(`/admin/users/${userId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Details
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
            <p className="text-sm text-gray-600 mt-1">Update user information and settings</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate(`/admin/users/${userId}`)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Basic Information</span>
            </CardTitle>
            <CardDescription>Update the user's personal and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Role */}
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-red-600" />
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span>Manager</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="user">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>User</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span>Viewer</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
              </div>
            </div>

            {/* Role Preview */}
            {formData.role && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Selected Role:</span>
                  <Badge variant="secondary" className={getRoleColor(formData.role)}>
                    {React.createElement(getRoleIcon(formData.role), { className: "w-3 h-3 mr-1" })}
                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Business Information</span>
            </CardTitle>
            <CardDescription>Update business-related details and registration information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Business Name */}
              <div>
                <Label htmlFor="business_name">Business Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="business_name"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange("business_name", e.target.value)}
                    placeholder="Enter business name"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* CAC Registration Number */}
              <div>
                <Label htmlFor="cac_reg_no">CAC Reg. No</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="cac_reg_no"
                    value={formData.cac_reg_no}
                    onChange={(e) => handleInputChange("cac_reg_no", e.target.value)}
                    placeholder="Enter CAC registration number"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter complete address"
                  className="pl-10 min-h-[80px]"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Optional notes and account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes about the user"
                rows={4}
              />
            </div>

            <Separator />

            {/* Account Status */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Active User</Label>
                <p className="text-sm text-gray-500">User can log in and access the system</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Update Preview</CardTitle>
            <CardDescription>Preview of the updated user information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-md p-4">
              <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    name: formData.name || "User name...",
                    email: formData.email || "user@example.com",
                    role: formData.role || "user",
                    phone: formData.phone || null,
                    business_name: formData.business_name || null,
                    cac_reg_no: formData.cac_reg_no || null,
                    address: formData.address || null,
                    is_active: formData.is_active,
                    notes: formData.notes || null,
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

export default EditUser
