import { getProfile } from "@/app/actions/profile";
import ProfileForm from "@/components/profile/ProfileForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProfileForm profile={profile} userEmail={user.email || ""} />
    </div>
  );
}
