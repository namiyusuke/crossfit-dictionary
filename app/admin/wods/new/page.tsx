import { getAllMovements } from "@/lib/data/movements";
import WodForm from "@/components/admin/WodForm";
import { createWodAction } from "../actions";

export default async function NewWodPage() {
  const movements = await getAllMovements();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">WODを新規作成</h1>
      <WodForm movements={movements} action={createWodAction} />
    </div>
  );
}
