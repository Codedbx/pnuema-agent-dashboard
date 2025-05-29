import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Bell, User, Calendar, FileText, Trash2, Edit } from "lucide-react"

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      message: "John Doe just booked your...",
      time: "23 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      message: "John Doe just booked your...",
      time: "45 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      message: "John Doe just booked your...",
      time: "1 hour ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const activities = [
    {
      id: 1,
      action: "Changed the style.",
      time: "just now",
      icon: Edit,
      color: "bg-purple-500",
    },
    {
      id: 2,
      action: "Booked a new package",
      time: "5X minutes ago",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      id: 3,
      action: "Submitted a modification",
      time: "12 hours ago",
      icon: FileText,
      color: "bg-orange-500",
    },
    {
      id: 4,
      action: "Modified A data in Page X.",
      time: "Today, 11:29 AM",
      icon: Edit,
      color: "bg-amber-600",
    },
    {
      id: 5,
      action: "Deleted a trip X.",
      time: "Dec 2, 2024",
      icon: Trash2,
      color: "bg-blue-500",
    },
  ]

  const trafficData = [
    { platform: "Google", value: 85 },
    { platform: "YouTube", value: 70 },
    { platform: "Instagram", value: 60 },
    { platform: "Pinterest", value: 45 },
    { platform: "Facebook", value: 40 },
    { platform: "Twitter", value: 30 },
    { platform: "Tumblr", value: 25 },
  ]

  return (
    <div className="w-80 border-l bg-background p-4 space-y-6 overflow-y-auto">
      {/* Notifications Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activities Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-1.5 rounded-full ${activity.color}`}>
                <activity.icon className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Traffic by Website Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Traffic by Website</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trafficData.map((item) => (
            <div key={item.platform} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{item.platform}</span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationsPanel
