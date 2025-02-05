import React, { createContext, ReactNode, useContext, useState } from "react";

export type FilterOption = "All" | "Furniture" | "Object" | "Workshop";

interface GalleryContextType {
  selectedFilter: FilterOption;
  setSelectedFilter: (filter: FilterOption) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");

  return (
    <GalleryContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}
