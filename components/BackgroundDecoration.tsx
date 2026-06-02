import Image from "next/image";
import SpriteAnimation from "@/app/movement/[id]/SpriteAnimation";
export default function BackgroundDecoration() {
  return (
    <>
      <div
        className="hidden md:block min-h-screen z-1 fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png')" }}
      ></div>
      <div className="hidden md:block fixed z-20 top-[80px] w-full overflow-hidden font-gothic text-[100px] leading-none">
        <div className="bg-[#414141] py-10 bg-center bg-repeat ">
          <div className="bg-contain absolute inset-0" style={{ backgroundImage: "url('/noise-bg.png')" }}></div>
          <div className="flex gap-6 w-max animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6 items-center shrink-0 leading-none">
                <span className="text-[#181818] leading-none">CrossFit</span>
                <span
                  className="leading-none text-transparent tracking-wider"
                  style={{ WebkitTextStroke: "1px #F1FE7D" }}
                >
                  CrossFit
                </span>
                <span className="text-[#181818] leading-none">CrossFit</span>
                <span
                  className="text-transparent tracking-wider leading-none"
                  style={{ WebkitTextStroke: "1px #F1FE7D" }}
                >
                  CrossFit
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden z-40 md:block  fixed inset-0 w-full h-full pointer-events-none visible translate-z-0">
        <div className="grid grid-cols-[1fr_375px_1fr] h-screen overflow-hidden sticky top-0 w-full">
          <div className="relative">
            <div className="flex absolute inset-0 mb-[10%] items-center flex-col justify-center m-auto h-full">
              <div className="relative">
                <div className="absolute bottom-[96%] mx-auto left-0 right-0 ">
                  <SpriteAnimation
                    category={"bg02"}
                    className="w-[min(calc(174_/_1440_*_100vw),174px)] mx-auto left-0 right-0 "
                    interval={1200}
                    delay={1400}
                  />
                </div>
                {/* <p className="bg-green rounded-[8px] text-center text-black py-2 px-3 font-black mb-3.5 leading-none">
                  本気のやつらのための
                </p>
                <p className="text-center">
                  <span className="block font-gothic text-5xl mb-4">CrossFit</span>
                  <span className="font-gothic text-2xl">種目辞典</span>
                </p> */}
                <Image className="" width={256} height={72} src="/logo-opening.png" alt="ケトルべル" />
              </div>
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
              <div className="absolute translate-x-[200px] translate-y-[216px] ">
                <SpriteAnimation
                  category={"bg05"}
                  className="w-[min(calc(130_/_1440_*_100vw),130px)]"
                  interval={1200}
                  delay={10}
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
              <div className="absolute z-1 translate-x-[120px] translate-y-[236px] ">
                {/* <SpriteAnimation
                  category={"bg04"}
                  className="w-[min(calc(180_/_1440_*_100vw),180px)]"
                  interval={1400}
                  delay={600}
                /> */}
                <Image className="animate-rotate" alt="バー" src="/bg-char04-02.png" width={160} height={168} />
              </div>
              <Image
                className="absolute z-0 translate-x-[180px] translate-y-[356px] "
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
