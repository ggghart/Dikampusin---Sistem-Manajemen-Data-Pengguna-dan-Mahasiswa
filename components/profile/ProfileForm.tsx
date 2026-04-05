"use client";

import { useActionState, useEffect } from "react";
import { updateProfile } from "@/app/actions/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Mail } from "lucide-react";
import Link from "next/link";

export default function ProfileForm({ profile, userEmail }: { profile: any, userEmail: string }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <GlassCard className="w-full max-w-xl mx-auto mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
          Profil Pengguna
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Lihat dan perbarui informasi akun Anda.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              value={profile?.email || userEmail}
              disabled
              className="pl-10 bg-black/5 dark:bg-white/5 cursor-not-allowed text-gray-500!"
            />
          </div>
        </div>

        <div>
           <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
           <div className="relative">
             <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
             <Input
               name="name"
               type="text"
               defaultValue={profile?.name || ""}
               required
               className="pl-10"
             />
           </div>
        </div>

        {state?.success && (
          <div className="text-green-600 text-sm bg-green-50/50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
            Profil berhasil diperbarui.
          </div>
        )}

        {(state as any)?.error && (
          <div className="text-red-500 text-sm bg-red-50/50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            {(state as any).error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/">
             <Button type="button" variant="ghost">Batal</Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </GlassCard>
  );
}
