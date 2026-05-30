import { useState, useMemo } from "react";
import type { Movement, Category, Equipment } from "@/types/movement";
import { CATEGORY_COLORS, categoryLabels } from "@/types/movement";
import { X } from "lucide-react";

export interface SelectedMovement {
  movement: Movement;
  reps: string;
}

interface StepMovementPickerProps {
  movements: Movement[];
  userEquipment: Equipment[];
  selectedMovements: SelectedMovement[];
  onMovementsChange: (movements: SelectedMovement[]) => void;
  defaultReps: string;
}

const CATEGORIES: Category[] = ["W", "G", "M"];

export default function StepMovementPicker({
  movements,
  userEquipment,
  selectedMovements,
  onMovementsChange,
  defaultReps,
}: StepMovementPickerProps) {
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [searchText, setSearchText] = useState("");

  const availableMovements = useMemo(() => {
    return movements.filter((m) => {
      // 設備フィルター
      if (userEquipment.length > 0) {
        const needsEquipment = m.equipment.filter((e) => e !== "なし");
        if (needsEquipment.length > 0 && !needsEquipment.some((e) => userEquipment.includes(e))) {
          return false;
        }
      }
      if (categoryFilter && m.category !== categoryFilter) return false;
      if (searchText) {
        const query = searchText.toLowerCase();
        return [m.name, m.nameEn].some((s) => s.toLowerCase().includes(query));
      }
      return true;
    });
  }, [movements, userEquipment, categoryFilter, searchText]);

  const isSelected = (id: string) => selectedMovements.some((sm) => sm.movement.id === id);

  const toggleMovement = (movement: Movement) => {
    if (isSelected(movement.id)) {
      onMovementsChange(selectedMovements.filter((sm) => sm.movement.id !== movement.id));
    } else {
      onMovementsChange([...selectedMovements, { movement, reps: defaultReps || "" }]);
    }
  };

  const updateReps = (movementId: string, reps: string) => {
    onMovementsChange(selectedMovements.map((sm) => (sm.movement.id === movementId ? { ...sm, reps } : sm)));
  };

  const removeMovement = (movementId: string) => {
    onMovementsChange(selectedMovements.filter((sm) => sm.movement.id !== movementId));
  };

  return (
    <div>
      <p className="font-gothic text-2xl text-green mb-6">種目を選ぼう</p>

      {/* 検索 */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="種目名で検索"
        className="w-full px-4 py-3 rounded-xl bg-[#414141] text-white text-sm mb-4 outline-none placeholder-[#888]"
      />

      {/* カテゴリフィルター */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`px-4 py-2 rounded-[10px] text-xs font-black transition-all cursor-pointer border ${
            categoryFilter === null ? "bg-white text-black border-white" : "border-[#666] text-[#999]"
          }`}
        >
          すべて
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
            className="px-4 py-2 rounded-[10px] text-xs font-black transition-all cursor-pointer border"
            style={{
              borderColor: categoryFilter === cat ? CATEGORY_COLORS[cat] : "#666",
              background: categoryFilter === cat ? CATEGORY_COLORS[cat] : "transparent",
              color: categoryFilter === cat ? "#fff" : "#999",
            }}
          >
            {categoryLabels[cat].ja}
          </button>
        ))}
      </div>

      {/* 種目一覧 */}
      <div className="max-h-[240px] overflow-y-auto space-y-1 mb-6">
        {availableMovements.map((m) => {
          const selected = isSelected(m.id);
          return (
            <button
              key={m.id}
              onClick={() => toggleMovement(m)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                selected ? "bg-button/20" : "hover:bg-[#333]"
              }`}
            >
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[m.category] }} />
              <span className="text-sm flex-1">{m.name}</span>
              {selected && <span className="text-green text-xs font-black">選択中</span>}
            </button>
          );
        })}
      </div>

      {/* 選択済みムーブメント + レップ数入力 */}
      {selectedMovements.length > 0 && (
        <div className="border-t border-[#414141] pt-4">
          <p className="text-sm font-black mb-3 text-green">選択中（{selectedMovements.length}種目）</p>
          <div className="space-y-3">
            {selectedMovements.map((sm) => (
              <div key={sm.movement.id} className="flex items-center gap-3">
                <span
                  className="px-3 py-1.5 rounded-xl text-xs font-black text-white shrink-0"
                  style={{ background: CATEGORY_COLORS[sm.movement.category] }}
                >
                  {sm.movement.name}
                </span>
                <input
                  type="text"
                  value={sm.reps}
                  onChange={(e) => updateReps(sm.movement.id, e.target.value)}
                  placeholder="10回"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#414141] text-white text-sm outline-none placeholder-[#888] min-w-0"
                />
                <button onClick={() => removeMovement(sm.movement.id)} className="text-[#888] cursor-pointer shrink-0">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
