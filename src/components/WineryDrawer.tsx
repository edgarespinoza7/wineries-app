"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { type WineryProperties } from "./MapDisplay"; // Import the shared type

interface WineryDrawerProps {
  winery: WineryProperties | null;
  onClose: () => void;
}

export function WineryDrawer({ winery, onClose }: WineryDrawerProps) {
  // The drawer's open state is controlled by whether a `winery` object is provided.
  const isOpen = winery !== null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full md:w-1/3 max-w-lg h-full focus:outline-none">
        <div className="mx-auto w-full p-4 overflow-y-auto">
          {winery && (
            <>
              <DrawerHeader>
                <DrawerTitle className="text-2xl">{winery.name}</DrawerTitle>
                <DrawerDescription>
                  {/* Join the array of DOs for display */}
                  {winery.do}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                {/* We can add more details here later */}
                <p>More details about the winery will go here.</p>
                <p className="mt-4 text-sm text-gray-500">{winery.address}</p>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
