"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  // Database,
  FileIcon,
  Globe,
  // Group,
  Key,
  // LayoutGrid,
  // Lock,
  Menu,
  ShoppingBag,
} from "lucide-react";
import StorageFiles from "@/components/storage/Storage.Files";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isNew?: boolean;
  items?: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const navigation: { section: string; items: NavItem[] }[] = [
  {
    section: "IPFS",
    items: [
      {
        title: "IPFS Files",
        icon: FileIcon,
        isNew: true
      },
      // {
      //   title: "IPFS Groups",
      //   icon: LayoutGrid,
      // },
      // {
      //   title: "Access Controls",
      //   icon: Lock,
      // },
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
];

export default function Storage() {
  const [activeSection, setActiveSection] = React.useState("IPFS Files");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 border-r bg-background p-4 transition-transform duration-200 ease-in-out md:static md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
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
        {activeSection === "IPFS Files" && <StorageFiles />}
      </div>
    </div>
  );
}
