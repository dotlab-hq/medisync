import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  QrCode,
  Bell,
  Calendar,
  Shield,
  MoreHorizontal,
} from "lucide-react";

import { getUserProfile } from "@/server/user";
import { listAllDocuments } from "@/server/documents";
import { listReminders } from "@/server/reminders";
import { listAppointments } from "@/server/appointments";
import { BLOOD_GROUP_LABELS } from "@/types";
import type { BloodGroup } from "@/types";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: DashboardHomePage,
});

const EMPTY_VALUES = ["na", "n/a", "none", "nil", ""];

function isEffectivelyEmpty(val: string | null | undefined) {
  return !val || EMPTY_VALUES.includes(val.trim().toLowerCase());
}

function MedicalField({ label, value }: { label: string; value: string | null | undefined }) {
  const [open, setOpen] = useState(false);
  const empty = isEffectivelyEmpty(value);
  const trimmed = value?.trim() ?? "";
  const isLong = trimmed.length > 30;

  if (empty) {
    return (
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">NA</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-center gap-1">
        <p className="max-w-30 truncate text-sm font-medium">
          {isLong ? trimmed.slice(0, 28) + "…" : trimmed}
        </p>
        {isLong && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 shrink-0"
                  onClick={() => setOpen(true)}
                >
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-50 whitespace-pre-line">
                {trimmed}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <p className="text-sm leading-relaxed whitespace-pre-line">{trimmed}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-2 h-5 w-48" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function DashboardHomePage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
  });

  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: () => listAllDocuments(),
  });

  const { data: reminders } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => listReminders(),
  });

  const { data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => listAppointments(),
  });

  if (isLoading) return <DashboardSkeleton />;

  const quickLinks = [
    { label: "Documents", icon: FileText, path: "/dashboard/documents", count: documents?.length ?? 0 },
    { label: "QR Code", icon: QrCode, path: "/dashboard/qr-code", count: profile?.qrCode ? 1 : 0 },
    { label: "Reminders", icon: Bell, path: "/dashboard/reminders", count: reminders?.length ?? 0 },
    { label: "Appointments", icon: Calendar, path: "/dashboard/appointments", count: appointments?.length ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold">
          Welcome back, {profile?.name ?? "User"}
        </h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s your health overview</p>
      </div>

      <Card className="animate-fade-in-up stagger-1 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Medical Profile
          </CardTitle>
          <CardDescription>Your key medical information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Blood Group</p>
              <Badge variant="secondary" className="mt-1">
                {profile?.bloodGroup
                  ? BLOOD_GROUP_LABELS[profile.bloodGroup as BloodGroup] ?? profile.bloodGroup
                  : "Not set"}
              </Badge>
            </div>
            <MedicalField label="Allergies" value={profile?.medicalInformation?.allergies} />
            <MedicalField label="Chronic Conditions" value={profile?.medicalInformation?.chronicConditions} />
            <div>
              <p className="text-xs text-muted-foreground">Emergency Contacts</p>
              <p className="mt-1 text-sm font-medium">{profile?.emergencyContacts?.length ?? 0} contact(s)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {quickLinks.map(({ label, icon: Icon, path, count }, idx) => (
          <Link key={path} to={path}>
            <Card className={`animate-fade-in-up stagger-${idx + 2} cursor-pointer border-border/50 transition-all hover:border-primary/50 hover:shadow-md`}>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">{label}</p>
                <Badge variant={count > 0 ? "secondary" : "outline"} className="mt-1 text-xs">
                  {count}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
