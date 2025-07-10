import React from 'react';

interface CourseApprovalCardProps {
  title: string;
  dateCreated: string;
}

export const CourseApprovalCard: React.FC<CourseApprovalCardProps> = ({ title, dateCreated }) => (
  <div className="border-l-4 h-fit animate-fade-slide-in border-l-academy-orange pl-2 flex justify-between items-center">
    <div>
      <p className="text-[15px] font-medium font-product-sans text-[#534a4a]">
        Course pending approval
      </p>
      <p className="text-xs text-academy-orange font-nunito font-normal">{title}</p>
    </div>
    <span className="text-[13px] text-neutrals-9 whitespace-nowrap font-nunito">{dateCreated}</span>
  </div>
);
