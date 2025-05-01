import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useToast, toast } from "@/hooks/use-toast";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export { useToast, toast };