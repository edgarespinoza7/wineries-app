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

function formatDisplayText(text: string): string {
  if (!text) return ''
  return text.replace(/\b\w/g, (l) => l.toUpperCase())
}

export function WineryDrawer({ winery, onClose }: WineryDrawerProps) {
  // Use the hook to check if the screen is desktop-sized (md breakpoint is 768px)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isOpen = winery !== null

  // Render the Dialog for desktop screens
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} modal={false}>
        <DialogContent className="w-full md:w-1/3 max-w-lg h-full focus:outline-none p-0 left-0 top-0 translate-x-0 translate-y-0 rounded-none border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left">
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

  console.log(typeof winery.do)
  console.log(typeof winery.services)
  return (
    <div className="mx-auto w-full p-4 overflow-y-auto h-full">
      <DrawerHeader>
        <DrawerTitle className="text-2xl">{winery.name}</DrawerTitle>
        <DrawerDescription>
          DO:{' '}
          {Array.isArray(winery.do)
            ? winery.do.map(formatDisplayText).join(', ')
            : formatDisplayText(winery.do)}
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <p className="mt-4 text-sm text-gray-500">{winery.address}</p>
        {winery.website && (
          <p className="mt-4 text-sm text-blue-500">
            <a href={winery.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </p>
        )}
        {winery.services && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="list-disc pl-5 ">
              {Object.entries(winery.services).map(
                ([key, value]) =>
                  value && (
                    <li key={key} className="mt-2 text-sm text-gray-600">
                      {value ? key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : ''}
                    </li>
                  ),
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
