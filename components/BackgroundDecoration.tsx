import Image from "next/image";
import SpriteAnimation from "@/app/movement/[id]/SpriteAnimation";
export default function BackgroundDecoration() {
  return (
    <>
      <div
        className="min-h-screen z-1 fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>
      <div className="fixed z-20 top-[80px] w-full overflow-hidden font-gothic text-[100px] leading-none">
        <div className="bg-[#414141] py-10">
          <div className="flex gap-6 w-max animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6 items-center shrink-0">
                <span className="text-[#181818]">CrossFit</span>
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #F1FE7D" }}>
                  CrossFit
                </span>
                <span className="text-[#181818]">CrossFit</span>
                <span className="text-transparent" style={{ WebkitTextStroke: "1px #F1FE7D" }}>
                  CrossFit
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="z-2 fixed inset-0 w-full h-full pointer-events-none visible translate-z-0">
        <div className="grid grid-cols-[1fr_375px_1fr] h-screen overflow-hidden sticky top-0 w-full">
          <div className="relative">
            <div className="flex absolute inset-0 mb-[10%] items-center flex-col justify-center m-auto h-full">
              <p className="bg-green rounded-[8px] text-black py-2 px-3 font-black mb-3.5 leading-none">
                本気のやつらのための
              </p>
              <p className="text-center">
                <span className="block font-gothic text-5xl mb-4">CrossFit</span>
                <span className="font-gothic text-2xl">種目辞典</span>
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute translate-x-[-100px] translate-y-[216px] ">
                <SpriteAnimation
                  category={"bg01"}
                  className="w-[min(calc(174_/_1440_*_100vw),174px)]"
                  interval={1000}
                  delay={0}
                />
              </div>
              <div className="absolute translate-x-[120px] translate-y-[216px] ">
                <SpriteAnimation
                  category={"bg02"}
                  className="w-[min(calc(174_/_1440_*_100vw),174px)]"
                  interval={1200}
                  delay={1400}
                />
              </div>
              <Image
                className="absolute translate-x-[120px] translate-y-[356px] "
                width={60}
                height={77}
                src="/kettlebell.png"
                alt="ケトルべル"
              />
            </div>
          </div>
          <div className=""></div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute translate-x-[-120px] translate-y-[100px] ">
                <SpriteAnimation
                  category={"bg03"}
                  className="w-[min(calc(240_/_1440_*_100vw),240px)]"
                  interval={1100}
                  delay={1200}
                />
              </div>
              <div className="absolute translate-x-[120px] translate-y-[206px] ">
                <SpriteAnimation
                  category={"bg04"}
                  className="w-[min(calc(180_/_1440_*_100vw),180px)]"
                  interval={1400}
                  delay={600}
                />
              </div>
              <Image
                className="absolute translate-x-[180px] translate-y-[356px] "
                width={221}
                height={164}
                src="/dumbbell.png"
                alt="バー"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
