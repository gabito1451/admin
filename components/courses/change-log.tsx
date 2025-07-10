import { ArrowLeftRight } from 'lucide-react';

interface ChangeLogProps {
  changeLog: any;
}

export function ChangeLog({ changeLog }: ChangeLogProps) {
  const changeLogs = changeLog || [];

  if (changeLogs.length === 0) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Change Log</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          No changes have been recorded for this course yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-h-[500px] overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-2 md:gap-4 ">
        <h2 className="text-lg sm:text-xl font-semibold text-neutrals-10">Change Log</h2>
        <div className="h-[1px] bg-[#e5e5e5] w-full md:w-[90%]  mb-4 " />
      </div>

      <div className="hidden lg:flex lg:flex-row gap-4 lg:gap-6 items-stretch">
        <div className="flex-1">
          <p className="text-academy-orange font-bold text-lg ">Previous</p>
        </div>

        <div className="flex items-center justify-center  lg:w-[60px]" />

        <div className="flex-1">
          <p className="font-bold text-lg text-academy-orange">Updated</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {changeLogs.map((changeItem: any, index: number) => {
          const { oldContent, newContent } = changeItem;

          if (!oldContent && !newContent) return null;

          return (
            <div key={index} className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
                {/* Previous Content */}
                <div className="flex-1">
                  <div className="lg:hidden mb-2">
                    <p className="text-academy-orange font-medium text-sm">Previous</p>
                  </div>
                  <div className="border rounded-[5px] flex flex-col gap-2 border-[#D4D4D4] px-2.5 py-[0.825rem]">
                    <div className="bg-academy-orange text-white px-1.5 py-[3px] text-sm font-normal w-[90%] rounded-[3px]">
                      {oldContent?.category}
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-neutrals-8 font-normal leading-relaxed px-1.5 pb-10">
                      {oldContent?.description || 'No previous content available'}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center py-4 lg:py-8">
                  <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>

                {/* Updated Content */}
                <div className="flex-1">
                  <div className="lg:hidden mb-2 mt-4">
                    <p className="text-academy-orange font-medium text-sm">Updated</p>
                  </div>
                  <div className="border rounded-[5px] flex flex-col gap-2 border-[#D4D4D4] px-2.5 py-[0.825rem]">
                    <div className="bg-academy-orange text-white px-1.5 py-[3px] text-sm font-normal w-[90%] rounded-[3px]">
                      Updated
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-neutrals-8 font-normal leading-relaxed px-1.5 pb-10">
                      {newContent?.description || 'No updated content available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
