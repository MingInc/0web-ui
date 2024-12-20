'use client'

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { BarChart2, ChevronLeft, ChevronRight, Copy, Database, FileIcon, Globe, Group, Key, LayoutGrid, Lock, Menu, MoreVertical, ShoppingBag } from 'lucide-react'
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  isNew?: boolean
  items?: { title: string; icon: React.ComponentType<{ className?: string }> }[]
}

const navigation: { section: string; items: NavItem[] }[] = [
  {
    section: "STORAGE",
    items: [
      {
        title: "Files",
        icon: FileIcon,
        isNew: true,
      },
      {
        title: "Groups",
        icon: Group,
      },
    ],
  },
  {
    section: "IPFS",
    items: [
      {
        title: "IPFS Files",
        icon: Database,
      },
      {
        title: "IPFS Groups",
        icon: LayoutGrid,
      },
      {
        title: "Access Controls",
        icon: Lock,
      },
    ],
  },
  {
    section: "TOOLBOX",
    items: [
      {
        title: "Analytics",
        icon: BarChart2,
      },
      {
        title: "Gateways",
        icon: Globe,
      },
      {
        title: "API Keys",
        icon: Key,
      },
      {
        title: "Marketplace",
        icon: ShoppingBag,
      },
    ],
  },
]

const files = [
  {
    id: 1,
    name: "Screenshot from 2024-12-20 08-15-56.png",
    size: "67.48 KB",
    cid: "bafkr...03xti",
    created: "12/20/2024",
  },
]

export default function FileManagement() {
  const [activeSection, setActiveSection] = React.useState("Files")
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])
  const [rowsPerPage, setRowsPerPage] = React.useState("10")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(files.map(file => file.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    }
  }

  return (
    <div className="flex h-screen bg-background relative">
      {/* Mobile Menu Trigger */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-4 left-4 md:hidden z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-60 border-r bg-background p-4 transition-transform duration-200 ease-in-out md:static md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {navigation.map((nav) => (
          <div key={nav.section} className="mb-6">
            <h2 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
              {nav.section}
            </h2>
            <div className="space-y-1">
              {nav.items.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    activeSection === item.title && "bg-muted"
                  )}
                  onClick={() => setActiveSection(item.title)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.isNew && (
                    <span className="ml-2 rounded-full bg-orange-500 px-1.5 py-0.5 text-xs text-white">
                      NEW
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === files.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>SIZE</TableHead>
                  <TableHead>CID</TableHead>
                  <TableHead>CREATED</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(file.id)}
                        onCheckedChange={(checked) => handleSelectRow(file.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2 min-w-[200px]">
                        <FileIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{file.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <span className="truncate">{file.cid}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{file.created}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

