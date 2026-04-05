import Link from "next/link";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="w-full border-b border-[var(--color-glass-border)] bg-black/5 dark:bg-white/5 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 relative flex items-center justify-center">
            <Image src="/logoupa.png" alt="Logo UPA" fill className="object-contain dark:hidden" priority />
            <Image src="/logoputih.png" alt="Logo UPA" fill className="object-contain hidden dark:block" priority />
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight text-[var(--color-foreground)]">
            DiKampusin
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          {user && (
            <>
              <span className="text-sm font-medium hidden sm:inline-block">
                {user.email}
              </span>
              <Link href="/profile" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300" title="Profil">
                <User className="h-5 w-5" />
              </Link>
              <form action={logout}>
                <button 
                  type="submit" 
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-red-500"
                  title="Keluar"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
