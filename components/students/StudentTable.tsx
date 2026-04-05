"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import StudentFormModal from "./StudentFormModal";
import DeleteModal from "./DeleteModal";
import StudentDetailModal from "./StudentDetailModal";
import { useRouter } from "next/navigation";

type StudentTableProps = {
  data: any[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export default function StudentTable({ data, searchQuery, currentPage, totalPages, limit }: StudentTableProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    const limitStr = limit !== 10 ? `&limit=${limit}` : "";
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}&page=1${limitStr}`);
    } else {
      router.push(`/?page=1${limitStr}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const qStr = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
    const limitStr = limit !== 10 ? `&limit=${limit}` : "";
    router.push(`/?page=${newPage}${qStr}${limitStr}`);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const qStr = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
    router.push(`/?page=1&limit=${newLimit}${qStr}`);
  };

  let startP = Math.max(1, currentPage - 2);
  let endP = Math.min(totalPages, startP + 4);
  if (endP - startP < 4) {
      startP = Math.max(1, endP - 4);
  }
  const pages = Array.from({ length: endP - startP + 1 }, (_, i) => startP + i);

  const openAddModal = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const openDetailModal = (student: any) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const openEditModal = (student: any) => {
    setSelectedStudent(student);
    setIsDetailOpen(false); // Close detail modal if open
    setIsFormOpen(true);
  };

  const openDeleteModal = (student: any) => {
    setSelectedStudent(student);
    setIsDetailOpen(false); // Close detail modal if open
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input 
            name="q" 
            placeholder="Cari NIM, Nama, Email..." 
            defaultValue={searchQuery}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => {
                const el = document.querySelector('input[name="q"]') as HTMLInputElement;
                if (el) el.value = '';
                router.push('/');
              }}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-[var(--color-foreground)] transition-colors"
              title="Kembali ke Dashboard"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button onClick={openAddModal} className="w-full sm:w-auto">
            <Plus className="h-5 w-5 mr-2" /> Tambah Mahasiswa
          </Button>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-black/5 dark:bg-white/5 border-b border-[var(--color-glass-border)] text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4">NIM</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Jurusan</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data mahasiswa ditemukan.
                  </td>
                </tr>
              ) : (
                data.map((student) => (
                  <tr key={student.id} className="border-b border-[var(--color-glass-border)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{student.nim}</td>
                    <td className="px-6 py-4">{student.nama}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                        {student.jurusan}
                      </span>
                    </td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <Button variant="ghost" className="p-2 h-auto text-[var(--color-primary)]" onClick={() => openDetailModal(student)} title="Lihat Detail">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4 bg-black/5 dark:bg-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <span>Tampilkan</span>
            <select 
              value={limit} 
              onChange={handleLimitChange}
              className="rounded border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-2 py-1 focus:outline-none"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="40">40</option>
            </select>
            <span>data</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" className="p-2" disabled={currentPage <= 1} onClick={() => handlePageChange(1)}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="p-2" disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="hidden sm:flex items-center gap-1">
              {pages.map((p) => (
                <Button 
                  key={p} 
                  variant={p === currentPage ? "primary" : "ghost"} 
                  className="px-3" 
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
            <div className="sm:hidden font-medium text-[var(--color-foreground)] px-4">
              {currentPage} / {totalPages}
            </div>

            <Button variant="ghost" className="p-2" disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="p-2" disabled={currentPage >= totalPages} onClick={() => handlePageChange(totalPages)}>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <StudentDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        student={selectedStudent}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <StudentFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        student={selectedStudent} 
      />
      
      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        student={selectedStudent} 
      />
    </div>
  );
}
