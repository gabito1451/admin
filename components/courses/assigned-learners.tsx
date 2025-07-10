'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Assignment } from '@/types';
import { useAssignmentStore } from '@/features/courses/store/assignmentStore';
import { formatDate } from '@/lib/utils';
import { MoreHorizontal, Search, UserRound, Users, Tag } from 'lucide-react';
import { useNotificationStore } from '@/features/courses/store/notificationStore';
import { format } from 'date-fns';

interface AssignedLearnersProps {
  courseId: string;
}

export function AssignedLearners({ courseId }: AssignedLearnersProps) {
  const { assignments, getAssignmentsByCourse, removeAssignment } = useAssignmentStore();
  const { addNotification } = useNotificationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    // This would normally fetch from an API
    const courseAssignments = getAssignmentsByCourse(courseId);
    console.log(`Found ${courseAssignments.length} assignments for course ${courseId}`);
  }, [courseId, getAssignmentsByCourse]);

  const courseAssignments = getAssignmentsByCourse(courseId);

  const filteredAssignments = searchQuery
    ? courseAssignments.filter((a) =>
        a.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courseAssignments;

  const getAssigneeTypeIcon = (type: string) => {
    switch (type) {
      case 'learner':
        return <UserRound className="h-4 w-4" />;
      case 'department':
        return <Users className="h-4 w-4" />;
      case 'specialization':
        return <Tag className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleDeleteAssignment = (id: string) => {
    removeAssignment(id);
    addNotification(
      'success',
      'Assignment Removed',
      'The assignment has been successfully removed.'
    );
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg sm:text-xl font-semibold">Assigned Learners</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </div>

      {filteredAssignments.length === 0 ? (
        <div className="text-center py-8 sm:py-12 border rounded-md bg-muted/20">
          <h4 className="text-base sm:text-lg font-medium">No assignments found</h4>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            {searchQuery
              ? 'No assignments match your search query'
              : 'This course has not been assigned to any learners yet'}
          </p>
          {searchQuery && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Assignee</TableHead>
                <TableHead className="text-xs sm:text-sm">Type</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                  Assigned By
                </TableHead>
                <TableHead className="text-xs sm:text-sm">Assigned Date</TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">End Date</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium text-xs sm:text-sm">
                    <div className="truncate max-w-[120px] sm:max-w-none">
                      {assignment.assignedTo.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <div className="flex items-center">
                      {getAssigneeTypeIcon(assignment.assignedTo.type)}
                      <span className="ml-2 capitalize hidden sm:inline">
                        {assignment.assignedTo.type}
                      </span>
                      <span className="ml-2 capitalize sm:hidden text-xs">
                        {assignment.assignedTo.type.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                    <div className="truncate max-w-[100px] lg:max-w-none">
                      {assignment.assignedBy.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {formatDate(assignment.assignedAt, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                    {assignment.endDate ? format(new Date(assignment.endDate), 'dd/MM/yyyy') : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-xs sm:text-sm">
                          Edit Assignment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive text-xs sm:text-sm"
                          onClick={() => setConfirmDelete(assignment.id)}
                        >
                          Remove Assignment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <AlertDialogContent className="mx-4 sm:mx-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base sm:text-lg">Remove Assignment</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              Are you sure you want to remove this assignment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
              onClick={() => confirmDelete && handleDeleteAssignment(confirmDelete)}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
