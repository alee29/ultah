import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function DashboardSection({
  title,
  description,
  children,
}: DashboardSectionProps) {
  return (
    <Card className="border-none shadow-lg ring-1 ring-primary/10">
      <CardHeader>
        <CardTitle className="font-heading text-lg italic">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
