import { Suspense } from "react";
import { getAllMovements } from "@/lib/data/movements";
import { getAllWods } from "@/lib/data/wods";
import CrossFitDictionary from "@/components/CrossFitDictionary";

export default async function Page() {
  const [movements, wods] = await Promise.all([getAllMovements(), getAllWods()]);

  return (
    <Suspense>
      <div className="relative z-10 bg-black">
        <CrossFitDictionary movements={movements} wods={wods} />
      </div>
    </Suspense>
  );
}
