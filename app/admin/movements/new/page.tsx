import MovementForm from "@/components/admin/MovementForm";
import { createMovementAction } from "../actions";

export default function NewMovementPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">種目を新規作成</h1>
      <MovementForm action={createMovementAction} />
    </div>
  );
}
