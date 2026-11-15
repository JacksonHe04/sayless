import { redirect } from "next/navigation";

import { saylessAccountUrl } from "@/modules/auth/paths";

export default function ResetPasswordPage() {
  redirect(saylessAccountUrl);
}
