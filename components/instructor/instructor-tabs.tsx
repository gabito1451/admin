'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchInput from './searchInput';
import { Plus } from 'lucide-react';
import { FilterDropdown } from './filter-dropdown';
import { InstructorTable } from './active-instructor-table';
import {
  useInstructorModalStore,
  useInstructorStore,
} from '@/features/instructor/store/instructor-store';
import { useDeactivateInstructor } from '@/features/instructor/store/instructor-store';
import InviteStatus from './invite-status';

export const InstructorTabs = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const { openInviteModal } = useInstructorModalStore();
  const { openModal } = useDeactivateInstructor();

  const { searchInstructors } = useInstructorStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchInstructors(query);
  };

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 mt-3 sm:mt-4 lg:mt-5 bg-white-1 px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] h-auto sm:h-[39px] font-normal tracking-tight text-center sm:text-left w-full sm:w-auto">
          Instructors
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-6 w-full sm:w-auto">
          <Button
            // onClick={() => openModal('Segun Lawal')}
            className="w-full sm:w-auto max-w-full whitespace-nowrap border border-academy-orange text-academy-orange bg-white-1 hover:bg-white-1 text-sm lg:text-[14px] font-normal h-10 sm:h-[41px] px-3 sm:px-4 lg:px-4 order-2 sm:order-1"
          >
            <span className="hidden sm:inline">Deactivate Instructor</span>
            <span className="sm:hidden">Deactivate</span>
          </Button>

          <Button
            onClick={openInviteModal}
            className="w-full sm:w-auto max-w-full whitespace-nowrap bg-academy-orange hover:bg-[#e67300] text-white text-sm lg:text-[14px] font-normal h-10 sm:h-[41px] px-3 sm:px-4 lg:px-4 order-1 sm:order-2"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Invite Instructors</span>
            <span className="sm:hidden">Invite</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-white-2">
          <div className="flex flex-col md:hidden">
            <div className="pb-4">
              <SearchInput
                placeholder="Search instructor..."
                className="w-full h-10 max-w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <TabsList className="bg-transparent gap-4 justify-start overflow-x-auto scrollbar-hide">
              <TabsTrigger
                value="active"
                variant="underline"
                className="inline-block text-sm font-medium text-neutrals-8 border-transparent rounded-none px-0 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange pb-3"
              >
                Active Instructors
              </TabsTrigger>

              <TabsTrigger
                value="pending"
                variant="underline"
                className="inline-block text-sm font-medium text-neutrals-8 rounded-none px-0 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange pb-3"
              >
                Pending Onboarding
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="hidden md:flex flex-row  justify-between overflow-x-auto overflow-y-hidden scrollbar-hide">
            <TabsList className="bg-transparent pb-2 pt-0 lg:pt-[18px] gap-5 justify-start">
              <TabsTrigger
                value="active"
                variant="underline"
                className="inline-block text-base lg:text-[16px] font-medium text-neutrals-8 border-transparent rounded-none px-0 mt-0 lg:mt-3 data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange pb-3"
              >
                Active Instructors
              </TabsTrigger>

              <TabsTrigger
                value="pending"
                variant="underline"
                className="inline-block text-base lg:text-[16px] font-medium text-neutrals-8 rounded-none px-0 mt-0 lg:mt-3 data-[state=active]:border-b-2 data-[state=active]:border-academy-orange data-[state=active]:text-academy-orange pb-3"
              >
                Pending Onboarding
              </TabsTrigger>
            </TabsList>

            <div className="flex-shrink-0">
              <SearchInput
                placeholder="Search instructor..."
                className="w-64 lg:w-[384px]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 h-auto sm:h-[38px] items-stretch sm:items-center">
            <div className="w-full sm:w-auto">
              <FilterDropdown />
            </div>
          </div>
        </div>

        <div className="shadaow-md">
          <TabsContent value="active" className="mt-4 sm:mt-1">
            <div className="overflow-x-auto shadow-md">
              <InstructorTable />
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-4 sm:mt-6">
            <div className="overflow-x-auto">
              <InviteStatus />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
