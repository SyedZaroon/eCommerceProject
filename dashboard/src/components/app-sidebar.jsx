"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, BotIcon, ShoppingBasket, User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "eCommerce",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
    },

  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      isActive: true,
      icon: <ShoppingBasket />,
      items: [
        {
          title: "Add Product",
          url: "/dashboard/addproduct",
        },
        {
          title: "Add Collection",
          url: "/dashboard/addcollection",
        },
        {
          title: "Product List",
          url: "/dashboard/productlist",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: <User />,
      items: [
        {
          title: "Add Users",
          url: "/dashboard/adduser",
        },
        {
          title: "User List",
          url: "/dashboard/userlist",
        }
      ],
    },
  ]
}


export function AppSidebar({
  ...props
}) {
  const { user } = useAuth()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
