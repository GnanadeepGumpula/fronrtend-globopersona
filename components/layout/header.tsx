'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bell, Search, ChevronDown, SunMoon, CheckCheck, Mail, CalendarDays, MessageSquareText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { loadCampaigns, loadContacts } from '@/lib/browser-mock-store'

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    setThemeState(storedTheme)
  }, [])

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return { campaigns: [], contacts: [] }

    const campaigns = loadCampaigns().filter((campaign) =>
      campaign.name.toLowerCase().includes(query) ||
      campaign.subject.toLowerCase().includes(query)
    )
    const contacts = loadContacts().filter((contact) =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    )

    return { campaigns, contacts }
  }, [searchQuery])

  const applyTheme = (nextTheme: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.classList.toggle('light', nextTheme === 'light')
    window.localStorage.setItem('theme', nextTheme)
    setThemeState(nextTheme)
  }

  const openSearch = () => {
    setSearchOpen(true)
  }

  const handleSearchSubmit = () => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      setSearchOpen(true)
      return
    }

    if (searchResults.campaigns[0]) {
      router.push(`/campaigns/${searchResults.campaigns[0].id}`)
      setSearchOpen(false)
      return
    }

    if (searchResults.contacts[0]) {
      router.push(`/contacts/${searchResults.contacts[0].id}`)
      setSearchOpen(false)
      return
    }

    toast({ title: 'No results', description: `No campaigns or contacts matched "${searchQuery}".` })
  }
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 lg:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-lg lg:text-xl font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="hidden sm:block text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns or contacts..."
            className="w-48 lg:w-64 pl-9 bg-secondary/50 border-transparent focus:border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={openSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearchSubmit()
              }
            }}
          />
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={openSearch}>
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/campaigns')}>
              <Mail className="mr-2 h-4 w-4" />
              New campaign sent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/analytics')}>
              <CalendarDays className="mr-2 h-4 w-4" />
              Weekly report is ready
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/contacts')}>
              <MessageSquareText className="mr-2 h-4 w-4" />
              New contact activity
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast({ title: 'Notifications', description: 'Marked all as read (mock).' })}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="inline-flex">
              <SunMoon className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Change theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => applyTheme('light')}>
              Light {theme === 'light' ? '•' : ''}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => applyTheme('dark')}>
              Dark {theme === 'dark' ? '•' : ''}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
              <ChevronDown className="hidden lg:block h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/settings')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: 'Billing', description: 'Open billing portal (mock).' })}>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: 'Logged out', description: 'You have been logged out (mock).' })}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        title="Search Globopersona"
        description="Search campaigns and contacts"
        className="sm:max-w-2xl"
      >
        <CommandInput
          placeholder="Search campaigns or contacts..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSearchSubmit()
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No campaigns or contacts found.</CommandEmpty>
          {searchResults.campaigns.length > 0 && (
            <CommandGroup heading="Campaigns">
              {searchResults.campaigns.map((campaign) => (
                <CommandItem
                  key={`campaign-${campaign.id}`}
                  onSelect={() => {
                    router.push(`/campaigns/${campaign.id}`)
                    setSearchOpen(false)
                  }}
                >
                  <div className="flex flex-col">
                    <span>{campaign.name}</span>
                    <span className="text-xs text-muted-foreground">{campaign.subject}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {searchResults.campaigns.length > 0 && searchResults.contacts.length > 0 && <CommandSeparator />}
          {searchResults.contacts.length > 0 && (
            <CommandGroup heading="Contacts">
              {searchResults.contacts.map((contact) => (
                <CommandItem
                  key={`contact-${contact.id}`}
                  onSelect={() => {
                    router.push(`/contacts/${contact.id}`)
                    setSearchOpen(false)
                  }}
                >
                  <div className="flex flex-col">
                    <span>{contact.name}</span>
                    <span className="text-xs text-muted-foreground">{contact.email}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  )
}
