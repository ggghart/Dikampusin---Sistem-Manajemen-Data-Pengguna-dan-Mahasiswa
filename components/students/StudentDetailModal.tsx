"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { X, Edit2, Trash2, Calendar, Mail, BookOpen, Fingerprint } from "lucide-react";

type StudentDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: any;
  onEdit: (student: any) => void;
  onDelete: (student: any) => void;
};

export default function StudentDetailModal({ isOpen, onClose, student, onEdit, onDelete }: StudentDetailModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-lg relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300 mb-6">
          Detail Mahasiswa
        </h2>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-black/5 dark:bg-white/10">
              <Fingerprint className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">NIM</p>
              <p className="text-sm font-medium text-[var(--color-foreground)]">{student.nim}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-black/5 dark:bg-white/10">
              <UserIcon className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Nama Lengkap</p>
              <p className="text-sm font-medium text-[var(--color-foreground)]">{student.nama}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-black/5 dark:bg-white/10">
              <Mail className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-[var(--color-foreground)]">{student.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-black/5 dark:bg-white/10">
              <BookOpen className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Jurusan</p>
              <p className="text-sm font-medium text-[var(--color-foreground)]">{student.jurusan}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-black/5 dark:bg-white/10">
              <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tanggal Lahir</p>
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                {student.tanggal_lahir ? new Date(student.tanggal_lahir).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-glass-border)]">
          <Button variant="danger" onClick={() => onDelete(student)}>
            <Trash2 className="h-4 w-4 mr-2" /> Hapus
          </Button>
          <Button variant="primary" onClick={() => onEdit(student)}>
            <Edit2 className="h-4 w-4 mr-2" /> Edit Data
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

// Inline UserIcon to avoid adding another import right away if we don't need to touch it
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
