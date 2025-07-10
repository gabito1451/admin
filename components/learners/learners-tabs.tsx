'use client';

import { useEffect, useState } from 'react';
import FilterDropdown from './filter-dropdown';
import SearchInput from './search-input';
import LearnerTable from './learner-table';
import LearnerModal from '@/components/learners/learners-modal';
import { useLearnerStore } from '@/components/learners/store/learners-store';
import { Learner } from '@/components/learners/types/learner';

const PER_PAGE = 10;

export function LearnersTabs() {
  const setLearners = useLearnerStore((s) => s.setLearners);
  const learners = useLearnerStore((s) => s.learners);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'role' | 'department'>('role');
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);

  useEffect(() => {
    const dummy: Learner[] = Array(100)
      .fill(null)
      .map((_, i) => ({
        id: `2345345${i}`,
        name: 'Segun Gbajabimila',
        email: `segunlaw${i}@gmail.com`,
        department: i % 2 === 0 ? 'Digital Transformation' : 'IT',
        role: i % 2 === 0 ? 'Product Manager' : 'UX Designer',
        assignedCourses: 15,
      }));
    setLearners(dummy);
  }, [setLearners]);

  const filtered = learners.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filterValue || l[filterType].toLowerCase() === filterValue.toLowerCase();
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
        <FilterDropdown selected={filterType} onSelect={setFilterType} />
        <SearchInput onChange={setSearch} />
      </div>

      {/* Table + Pagination in one component */}
      <LearnerTable
        data={pageData}
        onView={setSelectedLearner}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      {/* Modal */}
      <LearnerModal learner={selectedLearner} onClose={() => setSelectedLearner(null)} />
    </div>
  );
}
