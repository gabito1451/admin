import { Instructor } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

interface AboutAuthorProps {
  instructor: Instructor;
}

export function AboutAuthor({ instructor }: AboutAuthorProps) {
  const displayName = `${instructor.firstname} ${instructor.lastname}`;
  const bio = instructor.briefBio || 'No bio available for this instructor.';
  const email = instructor.email || 'Email not available';
  const department = instructor.department || 'Department not specified';

  return (
    <div className="space-y-3">
      <h3 className="mt-1 font-semibold text-xl text-neutrals-10">Instructor</h3>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4">
          <Avatar className="w-[5rem] h-[5rem] md:w-[120px] md:h-[120px]">
            <AvatarImage src={instructor.avatar} />
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center align-middle">
            <p className="text-academy-orange text-lg md:text-xl font-semibold font-inter">
              {displayName}
            </p>
            <div className="text-neutrals-8 text-sm font-normalfont-inter">
              <p>{department}</p>
              <p>{email}</p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 text-sm md:text-md font-normal font-inter">{bio}</p>
      </div>
    </div>
  );
}
