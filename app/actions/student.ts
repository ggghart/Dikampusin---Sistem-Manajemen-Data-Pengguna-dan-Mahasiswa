"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getStudents({ query, page = 1, limit = 10 }: { query?: string, page?: number, limit?: number } = {}) {
  const supabase = await createClient();
  let req = supabase.from("students").select("*", { count: "exact" }).order("created_at", { ascending: false });

  if (query) {
    req = req.or(`nim.ilike.%${query}%,nama.ilike.%${query}%,email.ilike.%${query}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  req = req.range(from, to);

  const { data, error, count } = await req;
  if (error) throw error;
  return { data, count };
}

export async function getStudentStats() {
  const supabase = await createClient();
  
  const { count: studentCount } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true });

  const { data } = await supabase.from("students").select("jurusan");
  const uniqueJurusan = new Set(data?.map((d: any) => d.jurusan) || []);

  return {
    studentCount: studentCount || 0,
    jurusanCount: uniqueJurusan.size || 0
  };
}

export async function addStudent(formData: FormData) {
  const supabase = await createClient();
  
  const nim = formData.get("nim") as string;
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const jurusan = formData.get("jurusan") as string;
  const tanggal_lahir = formData.get("tanggal_lahir") as string;

  const { error } = await supabase.from("students").insert({
    nim,
    nama,
    email,
    jurusan,
    tanggal_lahir: tanggal_lahir || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function updateStudent(id: number, formData: FormData) {
  const supabase = await createClient();
  
  const nim = formData.get("nim") as string;
  const nama = formData.get("nama") as string;
  const email = formData.get("email") as string;
  const jurusan = formData.get("jurusan") as string;
  const tanggal_lahir = formData.get("tanggal_lahir") as string;

  const { error } = await supabase.from("students").update({
    nim,
    nama,
    email,
    jurusan,
    tanggal_lahir: tanggal_lahir || null,
    updated_at: new Date().toISOString(),
  }).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function deleteStudent(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("students").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}
