import MovementForm from "@/components/admin/MovementForm";
import { createMovementAction } from "../actions";
import { requireAdmin } from "@/lib/admin-auth";

export default async function NewMovementPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">種目を新規作成</h1>
      <MovementForm action={createMovementAction} />
    </div>
  );
}
