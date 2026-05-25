import { notFound } from "next/navigation";
import { getWodById } from "@/lib/data/wods";
import { getAllMovements } from "@/lib/data/movements";
import WodForm from "@/components/admin/WodForm";
import { updateWodAction } from "../../actions";

export default async function EditWodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [wod, movements] = await Promise.all([getWodById(id), getAllMovements()]);
  if (!wod) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">WODを編集: {wod.name}</h1>
      <WodForm initialData={wod} movements={movements} action={updateWodAction} />
    </div>
  );
}
