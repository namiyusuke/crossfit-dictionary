import { Suspense } from "react";
import { getAllMovements } from "@/lib/data/movements";
import { getAllWods } from "@/lib/data/wods";
import CrossFitDictionary from "@/components/CrossFitDictionary";

export default async function Page() {
  const [movements, wods] = await Promise.all([getAllMovements(), getAllWods()]);

  return (
    <Suspense>
      <div className="relative">
        {/* <div className="inset-0 mx-auto w-[370px] w- fixed before:absolute before:-left-1.75  before:rounded-[24px] before:-right-1.75 before:inset-y-0 before:border before:border-[#939393] before:border-3 before:content-['']"></div> */}
        <div className="">
          <div className="relative z-10">
            <CrossFitDictionary movements={movements} wods={wods} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
