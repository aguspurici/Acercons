import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2.5 border rounded-none transition-colors ${
          currentPage === 1
            ? "border-white/5 text-white/20 cursor-not-allowed"
            : "border-white/10 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26]/40 cursor-pointer"
        }`}
        title="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[2.5rem] h-10 px-3 text-xs font-black uppercase tracking-widest border rounded-none transition-colors cursor-pointer ${
            page === currentPage
              ? "bg-[#F27D26] text-black border-[#F27D26]"
              : "bg-transparent text-white/60 border-white/10 hover:text-white hover:border-white/30"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2.5 border rounded-none transition-colors ${
          currentPage === totalPages
            ? "border-white/5 text-white/20 cursor-not-allowed"
            : "border-white/10 text-white/60 hover:text-[#F27D26] hover:border-[#F27D26]/40 cursor-pointer"
        }`}
        title="Página siguiente"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};