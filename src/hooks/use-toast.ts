"use client";

import { toast } from "@/components/ui/toast";

export function useToast() {
  return {
    toast: (props: Parameters<typeof toast.add>[0]) => toast.add(props),
  };
}
