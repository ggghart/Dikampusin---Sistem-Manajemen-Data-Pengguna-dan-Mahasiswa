"use client";

import { useActionState, useState } from "react";
import { register } from "@/app/actions/auth";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await register(formData);
  }, null);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <GlassCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] tracking-tight">
            Buat Akun
          </h1>
          <p className="text-sm text-gray-500 mt-2">Bergabung untuk mengelola data mahasiswa</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
            <div className="relative">
              <Input
                name="name"
                type="text"
                placeholder="Masukkan nama"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="Masukkan email"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                minLength={6}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                title={showPassword ? "Sembunyikan password" : "Lihat password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-[var(--color-foreground)] transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {state?.error && (
            <div className="text-red-500 text-sm bg-red-50/50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
              {state.error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Membuat akun..." : "Daftar"}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
              Masuk
            </Link>
          </p>
        </form>
      </GlassCard>
    </div>
  );
}
