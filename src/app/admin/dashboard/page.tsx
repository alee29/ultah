import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardSection } from "@/components/admin/dashboard-section";
import { GreetingTextForm } from "@/components/admin/greeting-text-form";
import { LogoutButton } from "@/components/admin/logout-button";
import { MusicSettingsForm } from "@/components/admin/music-settings-form";
import { PartnerDataForm } from "@/components/admin/partner-data-form";
import { PhotoManager } from "@/components/admin/photo-manager";
import { ADMIN_PIN_COOKIE, isValidPinToken } from "@/lib/admin-pin";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = isValidPinToken(
    cookieStore.get(ADMIN_PIN_COOKIE)?.value
  );

  if (!isAuthenticated) {
    redirect("/admin");
  }

  return (
    <div className="min-h-svh bg-background px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-sm tracking-widest text-primary uppercase">
              Pengaturan Halaman
            </p>
            <h1 className="font-heading mt-1 text-2xl font-semibold text-foreground italic">
              Dashboard
            </h1>
          </div>

          <LogoutButton />
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <DashboardSection
            title="Data Pasangan"
            description="Ubah nama dan tanggal ulang tahun yang tampil di halaman utama."
          >
            <PartnerDataForm />
          </DashboardSection>

          <DashboardSection
            title="Multimedia"
            description="Atur lagu latar dan foto-foto kenangan."
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground italic">
                  Musik
                </h3>
                <div className="mt-4">
                  <MusicSettingsForm />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-heading text-sm font-semibold text-foreground italic">
                  Foto
                </h3>
                <div className="mt-4">
                  <PhotoManager />
                </div>
              </div>
            </div>
          </DashboardSection>

          <DashboardSection
            title="Teks Ucapan"
            description="Perbarui kata-kata di kartu ucapan utama."
          >
            <GreetingTextForm />
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}
