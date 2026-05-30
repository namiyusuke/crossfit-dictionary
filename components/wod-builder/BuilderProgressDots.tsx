interface BuilderProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export default function BuilderProgressDots({ currentStep, totalSteps }: BuilderProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-3 rounded-full transition-all ${
            i === currentStep ? "bg-button w-5" : "border border-[#F1FE7D] w-3"
          }`}
        />
      ))}
    </div>
  );
}
