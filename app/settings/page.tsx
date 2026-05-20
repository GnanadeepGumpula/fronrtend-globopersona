'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Palette,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailReports: true,
    campaignAlerts: true,
    weeklyDigest: false,
    securityAlerts: true
  })

  return (
    <DashboardLayout 
      title="Settings" 
      description="Manage your account and preferences"
    >
      <div className="max-w-3xl space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Yash" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john.doe@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="America/New_York (EST)" />
            </div>
            <Button className="mt-2">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Company Details
            </CardTitle>
            <CardDescription>
              Information displayed in your email campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue="Globopersona" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Textarea 
                id="address" 
                defaultValue="123 Business Street&#10;New York, NY 10001&#10;United States"
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Required for CAN-SPAM compliance
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="replyTo">Default Reply-To Email</Label>
              <Input id="replyTo" type="email" defaultValue="support@acme.com" />
            </div>
            <Button className="mt-2">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Reports</p>
                <p className="text-sm text-muted-foreground">
                  Receive campaign performance reports via email
                </p>
              </div>
              <Switch 
                checked={notifications.emailReports}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, emailReports: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Campaign Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when campaigns are sent or fail
                </p>
              </div>
              <Switch 
                checked={notifications.campaignAlerts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, campaignAlerts: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Digest</p>
                <p className="text-sm text-muted-foreground">
                  Summary of your weekly email marketing activity
                </p>
              </div>
              <Switch 
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Security Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Important account security notifications
                </p>
              </div>
              <Switch 
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, securityAlerts: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button className="mt-2">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how Globopersona looks for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Use dark theme for the dashboard
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
