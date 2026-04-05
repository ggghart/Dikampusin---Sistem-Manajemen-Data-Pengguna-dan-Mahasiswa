"use client";

import { useActionState, useEffect, useState } from "react";
import { addStudent, updateStudent } from "@/app/actions/student";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

type StudentFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student?: any; // If editing, pass the student data
};

export default function StudentFormModal({ isOpen, onClose, student }: StudentFormModalProps) {
  const isEdit = !!student;
  
  const handleAction = async (prevState: any, formData: FormData) => {
    if (isEdit) {
      const res = await updateStudent(student.id, formData);
      if (res.success) {
        onClose();
        return { success: true };
      }
      return res;
    } else {
      const res = await addStudent(formData);
      if (res.success) {
        onClose();
        return { success: true };
      }
      return res;
    }
  };

  const [state, formAction, isPending] = useActionState(handleAction, null);

  if (!isOpen) return null;

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
          {isEdit ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru"}
        </h2>

        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">NIM</label>
              <Input name="nim" defaultValue={student?.nim || ""} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
              <Input name="nama" defaultValue={student?.nama || ""} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input name="email" type="email" defaultValue={student?.email || ""} required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Jurusan</label>
              <select 
                name="jurusan" 
                defaultValue={student?.jurusan || ""} 
                required
                className="flex h-10 w-full rounded-lg border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option className="text-black" value="">Pilih Jurusan</option>
                <option className="text-black" value="Informatika">Informatika</option>
                <option className="text-black" value="Sistem Informasi">Sistem Informasi</option>
                <option className="text-black" value="Teknik Elektro">Teknik Elektro</option>
                <option className="text-black" value="Manajemen">Manajemen</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1.5 block">Tanggal Lahir</label>
              <Input name="tanggal_lahir" type="date" defaultValue={student?.tanggal_lahir || ""} />
            </div>
          </div>

          {(state as any)?.error && (
            <div className="text-red-500 text-sm bg-red-50/50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 mt-2">
              {(state as any).error}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
