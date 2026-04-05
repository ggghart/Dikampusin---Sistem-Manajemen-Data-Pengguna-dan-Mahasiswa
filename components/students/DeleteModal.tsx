"use client";

import { useTransition } from "react";
import { deleteStudent } from "@/app/actions/student";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  student: any;
};

export default function DeleteModal({ isOpen, onClose, student }: DeleteModalProps) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen || !student) return null;

  const handleDelete = () => {
    startTransition(async () => {
      await deleteStudent(student.id);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-[var(--color-foreground)] mb-2">
          Hapus Data Mahasiswa
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Apakah Anda yakin ingin menghapus data <strong>{student.nama}</strong>? Tindakan ini tidak dapat dikembalikan.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
