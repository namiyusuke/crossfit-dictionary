import { movements } from "@/data/movements";
import { wods } from "@/data/wods";
import CrossFitDictionary from "@/components/CrossFitDictionary";

export default function Page() {
  return <CrossFitDictionary movements={movements} wods={wods} />;
}
