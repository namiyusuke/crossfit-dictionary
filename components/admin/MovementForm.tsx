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
import DynamicListField from "./DynamicListField";
import { Plus, Trash2 } from "lucide-react";
import type {
  Movement,
  Category,
  PrimaryEffect,
  BodyPart,
  Equipment,
  Prerequisite,
  Drill,
} from "@/types/movement";
import { ALL_EQUIPMENT, ALL_EFFECTS, ALL_BODY_PARTS, CATEGORY_LABELS } from "@/types/movement";

interface MovementFormProps {
  initialData?: Movement;
  action: (data: string) => Promise<{ error?: string }>;
}

const ALL_CATEGORIES: Category[] = ["weightlifting", "gymnastics", "cardio", "bodyweight"];

export default function MovementForm({ initialData, action }: MovementFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [id, setId] = useState(initialData?.id ?? "");
  const [name, setName] = useState(initialData?.name ?? "");
  const [nameEn, setNameEn] = useState(initialData?.nameEn ?? "");
  const [category, setCategory] = useState<Category>(initialData?.category ?? "weightlifting");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty ?? 1);
  const [videoId, setVideoId] = useState(initialData?.videoId ?? "");
  const [scaling, setScaling] = useState(initialData?.scaling ?? "");
  const [oneLiner, setOneLiner] = useState(initialData?.oneLiner ?? "");
  const [purpose, setPurpose] = useState(initialData?.purpose ?? "");

  const [equipment, setEquipment] = useState<Equipment[]>(initialData?.equipment ?? []);
  const [primaryEffect, setPrimaryEffect] = useState<PrimaryEffect[]>(initialData?.primaryEffect ?? []);
  const [bodyPart, setBodyPart] = useState<BodyPart[]>(initialData?.bodyPart ?? []);

  const [steps, setSteps] = useState<string[]>(initialData?.steps ?? [""]);
  const [tips, setTips] = useState<string[]>(initialData?.tips ?? [""]);
  const [muscleMain, setMuscleMain] = useState<string[]>(initialData?.muscleMain ?? [""]);
  const [muscleSub, setMuscleSub] = useState<string[]>(initialData?.muscleSub ?? [""]);

  const [hasRoadmap, setHasRoadmap] = useState(!!initialData?.roadmap);
  const [roadmapGoal, setRoadmapGoal] = useState(initialData?.roadmap?.goal ?? "");
  const [roadmapTime, setRoadmapTime] = useState(initialData?.roadmap?.timeEstimate ?? "");
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>(
    initialData?.roadmap?.prerequisites ?? []
  );
  const [drills, setDrills] = useState<Drill[]>(initialData?.roadmap?.drills ?? []);

  const toggleCheckbox = <T,>(list: T[], item: T, setter: (v: T[]) => void) => {
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const movement: Movement = {
      id,
      name,
      nameEn,
      category,
      equipment,
      oneLiner,
      purpose,
      primaryEffect,
      bodyPart,
      steps: steps.filter(Boolean),
      tips: tips.filter(Boolean),
      muscleMain: muscleMain.filter(Boolean),
      muscleSub: muscleSub.filter(Boolean),
      difficulty,
      scaling,
      videoId,
      roadmap: hasRoadmap
        ? { goal: roadmapGoal, timeEstimate: roadmapTime, prerequisites, drills }
        : null,
    };

    const result = await action(JSON.stringify(movement));
    if (result?.error) {
      setError(result.error);
      setSaving(false);
    } else {
      router.push("/admin/movements");
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
            <Label>ID（スラグ）</Label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={!!initialData}
              placeholder="例: air-squat"
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>カテゴリー</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>種目名（日本語）</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>種目名（英語）</Label>
            <Input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
          <div>
            <Label>難易度（1-5）</Label>
            <Select value={String(difficulty)} onValueChange={(v) => setDifficulty(Number(v))}>
              <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>YouTube動画ID</Label>
            <Input
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="例: PjY1rH4_MOA"
              required
              className="bg-[#1a1a1a] border-[#333] text-white"
            />
          </div>
        </div>
        <div>
          <Label>スケーリング</Label>
          <Input
            value={scaling}
            onChange={(e) => setScaling(e.target.value)}
            required
            className="bg-[#1a1a1a] border-[#333] text-white"
          />
        </div>
      </section>

      {/* テキスト */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">説明</h2>
        <div>
          <Label>一行説明</Label>
          <Textarea
            value={oneLiner}
            onChange={(e) => setOneLiner(e.target.value)}
            required
            className="bg-[#1a1a1a] border-[#333] text-white"
          />
        </div>
        <div>
          <Label>目的・効果</Label>
          <Textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="bg-[#1a1a1a] border-[#333] text-white"
          />
        </div>
      </section>

      {/* チェックボックス */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">分類</h2>
        <div>
          <Label>必要な設備</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_EQUIPMENT.map((eq) => (
              <label key={eq} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={equipment.includes(eq)}
                  onChange={() => toggleCheckbox(equipment, eq, setEquipment)}
                  className="accent-[#F1FE7D]"
                />
                {eq}
              </label>
            ))}
            <label className="flex items-center gap-1 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={equipment.includes("なし")}
                onChange={() => toggleCheckbox(equipment, "なし" as Equipment, setEquipment)}
                className="accent-[#F1FE7D]"
              />
              なし
            </label>
          </div>
        </div>
        <div>
          <Label>効果</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_EFFECTS.map((ef) => (
              <label key={ef} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={primaryEffect.includes(ef)}
                  onChange={() => toggleCheckbox(primaryEffect, ef, setPrimaryEffect)}
                  className="accent-[#F1FE7D]"
                />
                {ef}
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label>対象部位</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {ALL_BODY_PARTS.map((bp) => (
              <label key={bp} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={bodyPart.includes(bp)}
                  onChange={() => toggleCheckbox(bodyPart, bp, setBodyPart)}
                  className="accent-[#F1FE7D]"
                />
                {bp}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* 動的リスト */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b border-[#333] pb-2">詳細</h2>
        <DynamicListField label="やり方（ステップ）" items={steps} onChange={setSteps} placeholder="ステップを入力" />
        <DynamicListField label="注意点（Tips）" items={tips} onChange={setTips} placeholder="注意点を入力" />
        <DynamicListField label="主動筋" items={muscleMain} onChange={setMuscleMain} placeholder="例: 大腿四頭筋" />
        <DynamicListField label="補助筋" items={muscleSub} onChange={setMuscleSub} placeholder="例: 体幹" />
      </section>

      {/* ロードマップ */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#333] pb-2">
          <h2 className="text-lg font-bold">ロードマップ</h2>
          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hasRoadmap}
              onChange={() => setHasRoadmap(!hasRoadmap)}
              className="accent-[#F1FE7D]"
            />
            有効
          </label>
        </div>
        {hasRoadmap && (
          <div className="space-y-4 border border-[#333] rounded-lg p-4">
            <div>
              <Label>目標</Label>
              <Input
                value={roadmapGoal}
                onChange={(e) => setRoadmapGoal(e.target.value)}
                className="bg-[#1a1a1a] border-[#333] text-white"
              />
            </div>
            <div>
              <Label>期間目安</Label>
              <Input
                value={roadmapTime}
                onChange={(e) => setRoadmapTime(e.target.value)}
                placeholder="例: 4〜8週間"
                className="bg-[#1a1a1a] border-[#333] text-white"
              />
            </div>

            {/* Prerequisites */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>前提条件</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setPrerequisites([...prerequisites, { name: "", description: "", target: "" }])
                  }
                  className="text-[#F1FE7D]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  追加
                </Button>
              </div>
              {prerequisites.map((p, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                  <Input
                    value={p.name}
                    onChange={(e) => {
                      const next = [...prerequisites];
                      next[i] = { ...next[i], name: e.target.value };
                      setPrerequisites(next);
                    }}
                    placeholder="名前"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                  <Input
                    value={p.description}
                    onChange={(e) => {
                      const next = [...prerequisites];
                      next[i] = { ...next[i], description: e.target.value };
                      setPrerequisites(next);
                    }}
                    placeholder="説明"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={p.target}
                      onChange={(e) => {
                        const next = [...prerequisites];
                        next[i] = { ...next[i], target: e.target.value };
                        setPrerequisites(next);
                      }}
                      placeholder="目標"
                      className="bg-[#1a1a1a] border-[#333] text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setPrerequisites(prerequisites.filter((_, j) => j !== i))}
                      className="text-red-400 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Drills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>ドリル</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setDrills([...drills, { phase: "", name: "", detail: "", reps: "" }])
                  }
                  className="text-[#F1FE7D]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  追加
                </Button>
              </div>
              {drills.map((d, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                  <Input
                    value={d.phase}
                    onChange={(e) => {
                      const next = [...drills];
                      next[i] = { ...next[i], phase: e.target.value };
                      setDrills(next);
                    }}
                    placeholder="Phase"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                  <Input
                    value={d.name}
                    onChange={(e) => {
                      const next = [...drills];
                      next[i] = { ...next[i], name: e.target.value };
                      setDrills(next);
                    }}
                    placeholder="名前"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                  <Input
                    value={d.detail}
                    onChange={(e) => {
                      const next = [...drills];
                      next[i] = { ...next[i], detail: e.target.value };
                      setDrills(next);
                    }}
                    placeholder="詳細"
                    className="bg-[#1a1a1a] border-[#333] text-white"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={d.reps}
                      onChange={(e) => {
                        const next = [...drills];
                        next[i] = { ...next[i], reps: e.target.value };
                        setDrills(next);
                      }}
                      placeholder="レップ"
                      className="bg-[#1a1a1a] border-[#333] text-white"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setDrills(drills.filter((_, j) => j !== i))}
                      className="text-red-400 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
          onClick={() => router.push("/admin/movements")}
          className="border-[#333] text-white"
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
