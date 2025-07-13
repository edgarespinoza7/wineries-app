'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useMediaQuery } from '@/hooks/use-media-query' // Adjust path if needed
import { type WineryProperties } from './MapDisplay'

interface WineryDrawerProps {
  winery: WineryProperties | null
  onClose: () => void
}

export function WineryDrawer({ winery, onClose }: WineryDrawerProps) {
  // Use the hook to check if the screen is desktop-sized (md breakpoint is 768px)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isOpen = winery !== null

  // Render the Dialog for desktop screens
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="w-full md:w-1/3 max-w-lg h-full focus:outline-none p-0">
          {/* We pass the winery data to a shared content component */}
          <DrawerContentComponent winery={winery} />
        </DialogContent>
      </Dialog>
    )
  }

  // Render the Drawer for mobile screens
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full h-full focus:outline-none">
        {/* We pass the winery data to the same shared content component */}
        <DrawerContentComponent winery={winery} />
      </DrawerContent>
    </Drawer>
  )
}

// Shared component to display the content, avoiding code duplication
function DrawerContentComponent({ winery }: { winery: WineryProperties | null }) {
  if (!winery) {
    return null
  }

  return (
    <div className="mx-auto w-full p-4 overflow-y-auto h-full">
      <DrawerHeader>
        <DrawerTitle className="text-2xl">{winery.name}</DrawerTitle>
        <DrawerDescription>
          {Array.isArray(winery.do) ? winery.do.join(', ') : winery.do}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <p>More details about the winery will go here.</p>
        <p className="mt-4 text-sm text-gray-500">{winery.address}</p>
      </div>
    </div>
  )
}
