import { Suspense } from "react";
import { movements } from "@/data/movements";
import { wods } from "@/data/wods";
import CrossFitDictionary from "@/components/CrossFitDictionary";

export default function Page() {
  return (
    <Suspense>
      <div className="relative z-10 bg-black">
        <CrossFitDictionary movements={movements} wods={wods} />
      </div>
    </Suspense>
  );
}
