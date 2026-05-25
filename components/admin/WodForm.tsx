"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { Wod, WodFormat, WodLevel, WodSet, WodMovement } from "@/types/wod";
import type { Movement, PrimaryEffect, BodyPart } from "@/types/movement";
import { ALL_EFFECTS, ALL_BODY_PARTS } from "@/types/movement";

interface WodFormProps {
  initialData?: Wod;
  movements: Movement[];
  action: (data: string) => Promise<{ error?: string }>;
}

const FORMATS: WodFormat[] = ["AMRAP", "EMOM", "ForTime"];
const LEVELS: WodLevel[] = ["初心者", "中級者"];

export default function WodForm({ initialData, movements, action }: WodFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [id, setId] = useState(initialData?.id ?? "");
  const [name, setName] = useState(initialData?.name ?? "");
  const [format, setFormat] = useState<WodFormat>(initialData?.format ?? "AMRAP");
  const [level, setLevel] = useState<WodLevel>(initialData?.level ?? "初心者");
  const [goal, setGoal] = useState(initialData?.goal ?? "");
  const [duration, setDuration] = useState(initialData?.duration ?? "");
  const [rounds, setRounds] = useState<string>(
    initialData?.rounds != null ? String(initialData.rounds) : ""
  );
  const [repScheme, setRepScheme] = useState(initialData?.repScheme ?? "");
  const [tip, setTip] = useState(initialData?.tip ?? "");
  const [notes, setNotes] = useState(initialData?.notes ?? "");
  const [estimateBeginner, setEstimateBeginner] = useState(initialData?.estimate?.beginner ?? "");
  const [estimateRx, setEstimateRx] = useState(initialData?.estimate?.rx ?? "");

  const [targetBodyPart, setTargetBodyPart] = useState<BodyPart[]>(
    initialData?.targetBodyPart ?? []
  );
  const [targetEffect, setTargetEffect] = useState<PrimaryEffect[]>(
    initialData?.targetEffect ?? []
  );

  const [sets, setSets] = useState<WodSet[]>(
    initialData?.sets ?? [{ movements: [] }]
  );

  const toggleCheckbox = <T,>(list: T[], item: T, setter: (v: T[]) => void) => {
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const addSet = () => setSets([...sets, { movements: [] }]);
  const removeSet = (index: number) => setSets(sets.filter((_, i) => i !== index));

  const updateSetLabel = (index: number, label: string) => {
    const next = [...sets];
    next[index] = { ...next[index], label: label || undefined };
    setSets(next);
  };

  const addMovementToSet = (setIndex: number) => {
    const next = [...sets];
    next[setIndex] = {
      ...next[setIndex],
      movements: [...next[setIndex].movements, { movementId: "", name: "", reps: "" }],
    };
    setSets(next);
  };

  const removeMovementFromSet = (setIndex: number, movIndex: number) => {
    const next = [...sets];
    next[setIndex] = {
      ...next[setIndex],
      movements: next[setIndex].movements.filter((_, i) => i !== movIndex),
    };
    setSets(next);
  };

  const updateMovementInSet = (
    setIndex: number,
    movIndex: number,
    field: keyof WodMovement,
    value: string
  ) => {
    const next = [...sets];
    const mov = { ...next[setIndex].movements[movIndex], [field]: value };
    if (field === "movementId") {
      const found = movements.find((m) => m.id === value);
      if (found) mov.name = found.name;
    }
    next[setIndex] = {
      ...next[setIndex],
      movements: next[setIndex].movements.map((m, i) => (i === movIndex ? mov : m)),
    };
    setSets(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const wod: Wod = {
      id,
      name,
      format,
      level,
      goal,
      targetBodyPart,
      targetEffect,
      duration,
      sets,
      rounds: rounds ? Number(rounds) : undefined,
      repScheme: repScheme || undefined,
      estimate: { beginner: estimateBeginner, rx: estimateRx },
      tip,
      notes: notes || null,
    };

    const result = await action(JSON.stringify(wod));
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    } else {
      router.push("/admin/wods");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200">{error}</div>
      )}

      {/* 基本情報 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">基本情報</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>ID</Label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={!!initialData}
              placeholder="例: amrap-04"
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>名前</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>形式</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as WodFormat)}>
              <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>レベル</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as WodLevel)}>
              <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>所要時間</Label>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="例: 10分"
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>ラウンド数（任意）</Label>
            <Input
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
              type="number"
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div className="col-span-2">
            <Label>レップスキーム（任意）</Label>
            <Input
              value={repScheme}
              onChange={(e) => setRepScheme(e.target.value)}
              placeholder="例: 21-15-9"
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
        </div>
        <div>
          <Label>目標</Label>
          <Input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
            className="bg-[#1a1a1a] border-[#333] text-white"
          />
        </div>
      </section>

      {/* 分類 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">分類</h2>
        <div>
          <Label>対象部位</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_BODY_PARTS.map((bp) => (
              <label key={bp} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={targetBodyPart.includes(bp)}
                  onChange={() => toggleCheckbox(targetBodyPart, bp, setTargetBodyPart)}
                  className="accent-[#F1FE7D]"
                />
                {bp}
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label>効果</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_EFFECTS.map((ef) => (
              <label key={ef} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={targetEffect.includes(ef)}
                  onChange={() => toggleCheckbox(targetEffect, ef, setTargetEffect)}
                  className="accent-[#F1FE7D]"
                />
                {ef}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* 目安 */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">タイム目安</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>初心者目安</Label>
            <Input
              value={estimateBeginner}
              onChange={(e) => setEstimateBeginner(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>RX目安</Label>
            <Input
              value={estimateRx}
              onChange={(e) => setEstimateRx(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
        </div>
      </section>

      {/* セット */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#333] pb-2">
          <h2 className="text-lg font-bold">セット構成</h2>
          <Button type="button" variant="ghost" size="sm" onClick={addSet} className="text-[#F1FE7D]">
            <Plus className="w-4 h-4 mr-1" />
            セット追加
          </Button>
        </div>
        {sets.map((set, si) => (
          <div key={si} className="border border-[#333] rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#F1FE7D]">セット {si + 1}</span>
                <Input
                  value={set.label ?? ""}
                  onChange={(e) => updateSetLabel(si, e.target.value)}
                  placeholder="ラベル（任意: 奇数分, 偶数分 等）"
                  className="bg-[#1a1a1a] border-[#333] text-white w-64"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => addMovementToSet(si)}
                  className="text-[#F1FE7D]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  種目追加
                </Button>
                {sets.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSet(si)}
                    className="text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            {set.movements.map((mov, mi) => (
              <div key={mi} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  <Select
                    value={mov.movementId}
                    onValueChange={(v) => updateMovementInSet(si, mi, "movementId", v)}
                  >
                    <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white">
                      <SelectValue placeholder="種目を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {movements.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Input
                    value={mov.reps}
                    onChange={(e) => updateMovementInSet(si, mi, "reps", e.target.value)}
                    placeholder="回数"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    value={mov.rx ?? ""}
                    onChange={(e) => updateMovementInSet(si, mi, "rx", e.target.value)}
                    placeholder="RX基準（任意）"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMovementFromSet(si, mi)}
                    className="text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {set.movements.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-2">
                種目がありません（休憩セット等）
              </p>
            )}
          </div>
        ))}
      </section>

      {/* アドバイス */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">アドバイス</h2>
        <div>
          <Label>ワンポイントアドバイス</Label>
          <Textarea
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            required
            className="bg-[#1a1a1a] border-[#333] text-white"
          />
        </div>
        <div>
          <Label>備考（任意）</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-[#1a1a1a] border-[#333] text-white"
          />
        </div>
      </section>

      {/* 送信 */}
      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={saving}
          className="bg-[#F1FE7D] text-[#0a0a0a] hover:bg-[#d4e06a] font-bold px-8"
        >
          {saving ? "保存中..." : initialData ? "更新する" : "作成する"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/wods")}
          className="border-[#333] text-white"
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
