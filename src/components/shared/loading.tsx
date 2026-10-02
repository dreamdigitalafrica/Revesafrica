// src/components/Loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#0C529C]"></div>
    </div>
  );
}
