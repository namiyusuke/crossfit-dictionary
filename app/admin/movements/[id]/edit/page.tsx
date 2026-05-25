import { notFound } from "next/navigation";
import { getMovementById } from "@/lib/data/movements";
import MovementForm from "@/components/admin/MovementForm";
import { updateMovementAction } from "../../actions";
import { requireAdmin } from "@/lib/admin-auth";

export default async function EditMovementPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const movement = await getMovementById(id);
  if (!movement) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">種目を編集: {movement.name}</h1>
      <MovementForm initialData={movement} action={updateMovementAction} />
    </div>
  );
}
