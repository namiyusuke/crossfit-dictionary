import Image from "next/image";
import SpriteAnimation from "@/app/movement/[id]/SpriteAnimation";
export default function BackgroundDecoration() {
  return (
    <>
      <div
        className="hidden md:block min-h-screen z-1 fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          background:
            "linear-gradient(180deg, #262626 0%, rgba(38, 38, 38, 0) 30.29%, rgba(38, 38, 38, 0) 70.19%, #262626 100%), url('/bg.webp') center/cover no-repeat",
        }}
      ></div>
      <div className="hidden md:block fixed z-20 top-[80px] w-full overflow-hidden font-gothic text-[100px] leading-none">
        <div className="bg-[#414141] py-10 bg-center bg-repeat ">
          <div className="bg-contain absolute inset-0" style={{ backgroundImage: "url('/noise-bg.webp')" }}></div>
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
                {/* <p className="bg-green rounded-[8px] text-center text-black py-2 px-3 font-black mb-3.5 leading-none">
                  本気のやつらのための
                </p>
                <p className="text-center">
                  <span className="block font-gothic text-5xl mb-4">CrossFit</span>
                  <span className="font-gothic text-2xl">種目辞典</span>
                </p> */}
                <Image className="" width={256} height={72} src="/logo-opening.webp" alt="ケトルべル" priority />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute translate-x-[140px] translate-y-[216px] ">
                <SpriteAnimation
                  category={"bg01"}
                  className="w-[min(calc(80_/_1440_*_100vw),80px)]"
                  interval={1000}
                  delay={0}
                />
              </div>
              <div className="absolute translate-x-[-120px] translate-y-[200px] ">
                <SpriteAnimation
                  category={"bg03"}
                  className="w-[min(calc(280_/_1440_*_100vw),280px)]"
                  interval={1100}
                  delay={1200}
                />
              </div>
              {/* <div className="absolute translate-x-[200px] translate-y-[216px] ">
                <SpriteAnimation
                  category={"bg05"}
                  className="w-[min(calc(130_/_1440_*_100vw),130px)]"
                  interval={1200}
                  delay={10}
                />
              </div> */}
              <Image
                className="absolute translate-x-[40px] translate-y-[266px] "
                width={39}
                height={50}
                src="/kettlebell.webp"
                alt="ケトルべル"
              />
            </div>
          </div>
          <div className=""></div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute z-1 translate-x-[150px] translate-y-[276px] scale-x-[-1]">
                <Image className="animate-rotate" alt="バー" src="/bg-char04-02.webp" width={160} height={168} />
              </div>
              <Image
                className="absolute z-0 translate-x-[180px] translate-y-[376px]"
                width={180}
                height={114}
                src="/dumbbell.webp"
                alt="バー"
              />
            </div>
            <div className="absolute flex justify-center items-center inset-0 font-black">
              <p className="space-y-7 max-w-[346px] leading-[1.8]">
                <span className="block">
                  <span className="text-[calc(40/1440*100vw)]">CrossFit</span>
                  <span className="text-[calc(24/1440*100vw)]">とは、</span>
                </span>
                <span className="block text-[min(calc(14/1440*100vw),14px)]">
                  ウェイトリフティング・体操・有酸素運動を高強度で 組み合わせたフィットネスプログラム。
                </span>
                <span className="block text-[min(calc(14/1440*100vw),14px)]">
                  有酸素と無酸素の両方、つまり複数のエネルギー系を またいで全身をバランスよく鍛える。
                </span>
                <span className="block text-[min(calc(14/1440*100vw),14px)]">
                  WOD（その日のメニュー）を仲間と一緒にこなすスタイルが基本で、タイムや回数を記録して成長を測れるのも特徴。
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
