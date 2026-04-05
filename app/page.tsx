import { getStudents, getStudentStats } from "@/app/actions/student";
import StudentTable from "@/components/students/StudentTable";
import { GlassCard } from "@/components/ui/GlassCard";
import { Users, BookOpen } from "lucide-react";

// Update the page props signature correctly
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function DashboardPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const pageStr = typeof searchParams.page === "string" ? searchParams.page : "1";
  const limitStr = typeof searchParams.limit === "string" ? searchParams.limit : "10";
  const page = parseInt(pageStr, 10) || 1;
  const limit = parseInt(limitStr, 10) || 10;
  const { data: students, count } = await getStudents({ query: q, page, limit });
  const totalPages = Math.ceil((count || 0) / limit);
  const { studentCount, jurusanCount } = await getStudentStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-300">
          {q ? "Hasil Pencarian" : "Dashboard Mahasiswa"}
        </h1>
        <p className="text-gray-500 mt-2">
          {q ? `Menampilkan data untuk "${q}"` : "Kelola data mahasiswa dalam satu platform."}
        </p>
      </div>

      {!q && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard className="flex items-center gap-4 p-4 sm:p-6">
            <div className="p-3 sm:p-4 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Mahasiswa</p>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-foreground)]">{studentCount}</h3>
            </div>
          </GlassCard>
          
          <GlassCard className="flex items-center gap-4 p-4 sm:p-6">
            <div className="p-3 sm:p-4 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Program Studi</p>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-foreground)]">{jurusanCount}</h3>
            </div>
          </GlassCard>
        </div>
      )}

      <StudentTable data={students || []} searchQuery={q} currentPage={page} totalPages={totalPages} limit={limit} />
    </div>
  );
}
