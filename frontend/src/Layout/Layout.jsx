import Footer from '@/components/ui/Footer'
import { AppSidebar } from '@/components/ui/AppSiderbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Topbar from '@/components/ui/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
   <SidebarProvider>
      <Topbar />
      <div className="flex w-full">
        <AppSidebar />

        <main className="w-full pt-16 px-4">
          <div className="min-h-[calc(100vh-64px)]">
            <Outlet/>
          </div>

          <Footer />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout
