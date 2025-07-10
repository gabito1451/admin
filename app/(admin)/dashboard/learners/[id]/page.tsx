'use client';

import { useParams } from 'next/navigation';
import { learners } from '@/lib/data/learners';
import { icons } from '@/public/assets/icon';
import Tabs from '@/components/learners/Tabs';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Profile Skeleton Component
function ProfileSkeleton() {
  return (
    <>
      {/* Desktop Layout Skeleton */}
      <div className="relative hidden lg:block">
        <div className="bg-academy-orange" style={{ height: '183px' }}>
          <div className="flex flex-col lg:items-center gap-4 justify-between p-6 w-[90%] mx-auto lg:flex-row h-full">
            <div className="flex flex-col items-center gap-4 lg:gap-8 lg:flex-row">
              <div className="w-[198px] h-[198px]" />
              <div
                className="text-white absolute"
                style={{
                  width: '334px',
                  height: '102px',
                  top: '53px',
                  left: '299px',
                }}
              >
                <Skeleton className="h-8 w-64 mb-2 bg-white/20" />
                <Skeleton className="h-4 w-48 mb-1 bg-white/20" />
                <Skeleton className="h-4 w-56 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute" style={{ top: '25px', left: '50px' }}>
          <Skeleton className="w-[198px] h-[198px] rounded-full" />
        </div>
        <div
          className="flex gap-3 items-center py-2 px-3 w-auto bg-white rounded-xl absolute shadow-sm"
          style={{
            top: '80px',
            right: '5%',
            minWidth: '160px',
          }}
        >
          <Skeleton className="w-8 h-8 rounded-full" />
          <div>
            <Skeleton className="h-3 w-24 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      {/* Mobile Layout Skeleton */}
      <div className="block lg:hidden">
        <div className="bg-academy-orange px-6 py-8 pb-12">
          <div className="flex justify-center mb-6">
            <Skeleton className="w-[100px] h-[100px] rounded-full" />
          </div>
          <div className="text-center mb-6">
            <Skeleton className="h-6 w-48 mb-2 mx-auto bg-white/20" />
            <Skeleton className="h-4 w-32 mb-1 mx-auto bg-white/20" />
            <Skeleton className="h-4 w-40 mx-auto bg-white/20" />
          </div>
          <div className="flex justify-center">
            <div className="flex gap-3 items-center py-3 px-4 bg-white rounded-xl shadow-sm">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div>
                <Skeleton className="h-3 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LearnerProfilePage() {
  const params = useParams();
  const learnerId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [learner, setLearner] = useState<(typeof learners)[0] | null>(null);

  useEffect(() => {
    const loadLearner = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const foundLearner = learners.find((l) => l.id === learnerId || l.id === String(learnerId));
      setLearner(foundLearner || null);
      setIsLoading(false);
    };

    loadLearner();
  }, [learnerId]);

  if (isLoading) {
    return (
      <>
        <ProfileSkeleton />
        <div className="mt-8 lg:mt-20 mb-20 w-[90%] mx-auto">
          <Skeleton className="h-6 w-32 mb-5" />
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </>
    );
  }

  if (!learner) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Learner Not Found</h1>
        <p>
          Sorry, we couldn't find a learner with ID "{learnerId}". Please check the URL and try
          again.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="relative hidden lg:block">
        {/* Orange background section - Fixed height of 183px */}
        <div className="bg-academy-orange" style={{ height: '183px' }}>
          <div className="flex flex-col lg:items-center gap-4 justify-between p-6 w-[90%] mx-auto lg:flex-row h-full">
            <div className="flex flex-col items-center gap-4 lg:gap-8 lg:flex-row">
              {/* Placeholder for avatar spacing */}
              <div className="w-[198px] h-[198px]" />
              {/* Text container with specified positioning and dimensions */}
              <div
                className="text-white absolute"
                style={{
                  width: '334px',
                  height: '102px',
                  top: '53px',
                  left: '299px',
                }}
              >
                <h1 className="text-2xl lg:text-3xl font-bold">{learner.name}</h1>
                <p className="my-1 text-sm lg:text-[16px]">{learner.title}</p>
                <p className="text-sm lg:text-[16px]">{learner.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar positioned so only 20% overlaps below orange (80% within orange) */}
        <div className="absolute" style={{ top: '25px', left: '50px' }}>
          <Image
            src={learner.avatar}
            alt={learner.name}
            width={198}
            height={198}
            className="rounded-full shadow-lg"
            style={{
              borderRadius: '200px',
              border: '5.41px solid white',
            }}
          />
        </div>

        {/* Total Learning Time section - styled to match design */}
        <div
          className="flex gap-3 items-center py-2 px-3 w-auto bg-white rounded-xl absolute shadow-sm"
          style={{
            top: '80px',
            right: '5%',
            minWidth: '160px',
          }}
        >
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-500 text-sm">{icons.clock}</span>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-0">Total Learning Time</p>
            <p className="font-bold text-sm text-gray-900">{learner.totalLearningTime}</p>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Everything in orange section */}
      <div className="block lg:hidden">
        <div className="bg-academy-orange px-6 py-8 pb-12">
          {/* Avatar centered at top */}
          <div className="flex justify-center mb-6">
            <Image
              src={learner.avatar}
              alt={learner.name}
              width={100}
              height={100}
              priority
              className="rounded-full shadow-lg"
              style={{
                borderRadius: '100px',
                border: '3px solid white',
              }}
            />
          </div>

          {/* Text content centered below avatar */}
          <div className="text-white text-center mb-6">
            <h1 className="text-xl font-bold mb-2">{learner.name}</h1>
            <p className="text-sm mb-1">{learner.title}</p>
            <p className="text-sm">{learner.email}</p>
          </div>

          {/* Total Learning Time section within orange background */}
          <div className="flex justify-center">
            <div className="flex gap-3 items-center py-3 px-4 bg-white rounded-xl shadow-sm">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-sm">{icons.clock}</span>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-0">Total Learning Time</p>
                <p className="font-bold text-sm text-gray-900">{learner.totalLearningTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:mt-20 mb-20 w-[90%] mx-auto">
        <Tabs />
      </div>
    </>
  );
}
