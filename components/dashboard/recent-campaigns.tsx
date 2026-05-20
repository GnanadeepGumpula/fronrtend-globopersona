import Link from 'next/link'
import { Campaign } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRight, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface RecentCampaignsProps {
  campaigns: Campaign[]
}

const statusStyles = {
  draft: 'bg-muted text-muted-foreground border-muted',
  scheduled: 'bg-warning/10 text-warning border-warning/20',
  sent: 'bg-success/10 text-success border-success/20',
  active: 'bg-primary/10 text-primary border-primary/20',
}

export function RecentCampaigns({ campaigns }: RecentCampaignsProps) {
  const recentCampaigns = campaigns.slice(0, 5)

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Recent Campaigns</h3>
          <p className="text-sm text-muted-foreground">Your latest email campaigns</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/campaigns" className="flex items-center gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-6">Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead className="pr-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentCampaigns.map((campaign) => (
            <TableRow key={campaign.id} className="group">
              <TableCell className="pl-6">
                <div>
                  <p className="font-medium text-foreground">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                    {campaign.subject}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={cn('capitalize', statusStyles[campaign.status])}
                >
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-medium text-foreground">
                  {campaign.openRate > 0 ? `${campaign.openRate}%` : '-'}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">
                  {campaign.recipients > 0 ? campaign.recipients.toLocaleString() : '-'}
                </span>
              </TableCell>
              <TableCell className="pr-6 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
