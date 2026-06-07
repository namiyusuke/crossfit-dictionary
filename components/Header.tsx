interface HeaderProps {
  activeSection: string;
  onShowWodModal: () => void;
  onShowEquipmentSettings: () => void;
}

export default function Header({ activeSection, onShowWodModal, onShowEquipmentSettings }: HeaderProps) {
  return (
    <div className="flex justify-between w-full md:max-w-[375px] mx-auto fixed left-0 right-0 top-0 bg-black px-[16px] bg-[#262626] pt-14 pb-[14px] z-1000 md:rounded-tl-[24px] md:rounded-tr-[24px] overflow-clip">
      <h1 className="text-4xl font-gothic flex gap-4 font-normal text-green">
        <span>{activeSection}</span>
        {activeSection == "WOD" && (
          <span onClick={onShowWodModal} className="cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" fill="#414141" />
              <path
                d="M8.592 11.744C8.336 9.312 11.536 8.832 11.536 7.424C11.536 6.544 10.784 6.144 9.728 6.144C8.816 6.144 8.144 6.56 7.44 7.296L5.872 5.856C6.864 4.64 8.368 3.84 10.064 3.84C12.416 3.84 14.256 4.88 14.256 7.168C14.256 9.472 10.944 9.632 11.088 11.744H8.592ZM9.84 16.192C8.88 16.192 8.208 15.504 8.208 14.56C8.208 13.616 8.896 12.96 9.84 12.96C10.784 12.96 11.472 13.616 11.472 14.56C11.472 15.504 10.784 16.192 9.84 16.192Z"
                fill="white"
              />
            </svg>
          </span>
        )}
      </h1>
      <div className="text-right">
        <button
          onClick={onShowEquipmentSettings}
          className="text-xs rounded-[16px] bg-white font-black text-black px-4 py-2  transition-colors cursor-pointer"
        >
          設備変更
        </button>
      </div>
    </div>
  );
}
