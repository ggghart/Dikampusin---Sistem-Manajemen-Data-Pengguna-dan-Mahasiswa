"use client";

import { useActionState, useEffect, useState } from "react";
import { login } from "@/app/actions/auth";
import { getStudentStats } from "@/app/actions/student";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Lock, Mail, Users, BookOpen, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [stats, setStats] = useState({ studentCount: 0, jurusanCount: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    return await login(formData);
  }, null);

  useEffect(() => {
    getStudentStats().then(setStats).catch(() => {});
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Kolom Kiri: Statistik & Branding */}
        <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black md:tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
              DiKampusin
            </h1>
            <p className="text-gray-500 mt-4 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Platform sistem informasi manajemen mahasiswa terpadu yang cepat, aman, dan mantap betul.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <GlassCard className="flex items-center gap-4 p-4 sm:p-6 transition-transform hover:scale-[1.02]">
              <div className="p-4 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10">
                <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Mahasiswa Terdaftar</p>
                <h3 className="text-3xl font-black text-[var(--color-foreground)]">{stats.studentCount || 0}</h3>
              </div>
            </GlassCard>
            
            <GlassCard className="flex items-center gap-4 p-4 sm:p-6 transition-transform hover:scale-[1.02]">
              <div className="p-4 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10">
                <BookOpen className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Cakupan Program Studi</p>
                <h3 className="text-3xl font-black text-[var(--color-foreground)]">{stats.jurusanCount || 0}</h3>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Kolom Kanan: Login Form */}
        <GlassCard className="w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-sm text-gray-500 mt-2">Masuk ke akun Anda untuk mengelola data</p>
          </div>

          <form action={formAction} className="space-y-5">
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

            <Button type="submit" className="w-full py-2.5 mt-2" disabled={isPending}>
              {isPending ? "Masuk..." : "Masuk"}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6 pb-2">
              Belum punya akun?{" "}
              <Link href="/register" className="font-semibold text-[var(--color-primary)] hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </form>
        </GlassCard>

      </div>
    </div>
  );
}
