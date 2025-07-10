'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, CalendarIcon, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AssignmentFormData, Course } from '@/types';
import { useAssignmentStore } from '@/features/courses/store/assignmentStore';
import { useUserStore } from '@/features/courses/store/userStore';
import { useNotificationStore } from '@/features/courses/store/notificationStore';
import { format } from 'date-fns';
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
import { fetchLearners } from '@/features/courses/services/learners-service';

interface AssignCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
}

const formSchema = z.object({
  courseId: z.string(),
  assignees: z
    .array(
      z.object({
        type: z.enum(['learner', 'department']),
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, 'Please select at least one assignee'),
  endDate: z.date().optional(),
  notes: z.string().optional(),
});

export function AssignCourseModal({ open, onOpenChange, course }: AssignCourseModalProps) {

  const { assignCourse, assignments } = useAssignmentStore();
  const {
    currentUser,
    // learners,
    departments,
    // fetchLearners,
    fetchDepartments,
  } = useUserStore();
  const { addNotification } = useNotificationStore();

  const [activeTab, setActiveTab] = useState('learners');
  const [learners, setLearners] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessConfirmation, setShowSuccessConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<AssignmentFormData | null>(null);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: course.id,
      assignees: [],
      notes: '',
    },
  });

  useEffect(() => {

    if (open) {

      const fetchData = async () => {
        try {
          const res = await fetchLearners();
          if(res && typeof res === 'object' && 'data' in res){
              setLearners((res as { data: any }).data);
          } else {
              setLearners([]); // fallback to empty array to avoid crash
            }
        

         console.log("learners",learners);
         
          await fetchDepartments();
        } catch (error) {
          // console.error('❌ ERROR FETCHING DATA:', error);
        }
      };

      fetchData();
    }
  }, [open, fetchLearners, fetchDepartments]);

  // Filter options based on search query
  // const filteredLearners = searchQuery
  //   ? learners?.filter(
  //       (learner) =>
  //         learner?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         learner?.email.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   : learners;

  const filteredLearners = Array.isArray(learners)
  ? searchQuery
    ? learners.filter(
        (learner) =>
          learner?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          learner?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : learners
  : [];


  const filteredDepartments = searchQuery
    ? departments.filter((dept) => dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : departments;

  // Transform data for MultiSelect
  const learnerOptions = filteredLearners?.map((learner) => {
    const option = {
      value: learner?.id,
      label: learner?.name,
      badge: learner?.department,
      type: 'learner' as const,
    };
    return option;
  });

  const departmentOptions = filteredDepartments.map((dept) => {
    const option = {
      value: dept.id,
      label: dept.name,
      badge: `${dept.memberCount} members`,
      type: 'department' as const,
    };

    return option;
  });

  // Selected items from form
  const selectedItems = form.watch('assignees');

  // Check for duplicates to prevent assigning the same course multiple times
  const checkForDuplicates = (data: z.infer<typeof formSchema>) => {

    const duplicates = [];

    for (const assignee of data.assignees) {

      const isDuplicate = assignments.some((assignment) => {
        const match =
          assignment.courseId === data.courseId &&
          assignment.assignedTo.type === assignee.type &&
          assignment.assignedTo.id === assignee.id &&
          assignment.status === 'active';

        if (match) {
          console.log("Duplicate Found");
          
        }

        return match;
      });

      if (isDuplicate) {
        duplicates.push(assignee.name);

      } else {
      }
    }


    return duplicates;
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {

    const duplicates = checkForDuplicates(data);

    if (duplicates.length > 0) {


      const errorMessage = `The following assignees already have this course assigned: ${duplicates.join(', ')}`;


      addNotification('error', 'Duplicate Assignments Detected', errorMessage);
      return;
    }
    // setSubmittedData(data);
    setSubmittedData({
      ...data,
      endDate: data.endDate ? data.endDate.toISOString() : undefined,
    });
    setShowConfirmation(true);

  };

  const confirmAssignment = async () => {


    if (!submittedData || !currentUser) {

      return;
    }

    try {

      // Process assignment
      const newAssignments = await assignCourse(submittedData, currentUser);

      if (newAssignments.length > 0) {

        setShowConfirmation(false);

        onOpenChange(false);
        form.reset({
          courseId: course.id,
          assignees: [],
          notes: '',
        });

        setShowSuccessConfirmation(true);

        // Show success notification
        const assigneeCount = newAssignments.length;
        const successMessage = `The course has been assigned to ${assigneeCount} ${assigneeCount === 1 ? 'recipient' : 'recipients'}.`;

        addNotification('success', 'Course Assigned Successfully', successMessage);
      } else {
        // console.log('⚠️ NO ASSIGNMENTS CREATED - Possible error');
      }
    } catch (error) {
      addNotification(
        'error',
        'Assignment Failed',
        'There was an error assigning the course. Please try again.'
      );
    }
  };

  const handleItemSelect = (tabType: string, item: any) => {

    const currentItems = form.getValues('assignees');

    const isAlreadySelected = currentItems.some((i) => i.id === item.value && i.type === tabType);

    if (!isAlreadySelected) {
      const newAssignee = {
        type: tabType as 'learner' | 'department',
        id: item.value,
        name: item.label,
      };

      const updatedItems = [...currentItems, newAssignee];

      form.setValue('assignees', updatedItems);

    } else {
      // console.log('⚠️ ITEM ALREADY SELECTED - Skipping');
    }
  };

  const handleItemRemove = (itemId: string) => {

    const currentItems = form.getValues('assignees');

    const updatedItems = currentItems.filter((item) => item.id !== itemId);

    form.setValue('assignees', updatedItems);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setSearchQuery('');
      setActiveTab('learners');
      setShowConfirmation(false);
      setSubmittedData(null);
      form.reset();
    }

    onOpenChange(open);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="w-[95vw] max-w-[850px] max-h-[95vh] overflow-hidden flex flex-col p-4 sm:p-6">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-lg sm:text-xl">Assign course</DialogTitle>
            <DialogDescription className="text-sm">
              You can assign this course to single or multiple learners or departments.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Input value={course.title} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignees"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>Assign To</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
                            {selectedItems.length === 0 ? (
                              <div className="text-sm text-muted-foreground p-1">
                                Select learner or department
                              </div>
                            ) : (
                              selectedItems.map((item) => (
                                <div
                                  key={`${item.type}-${item.id}`}
                                  className="flex items-center bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-sm"
                                >
                                  <span className="truncate max-w-[150px]">{item.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleItemRemove(item.id)}
                                    className="ml-1 text-orange-600 hover:text-orange-800 flex-shrink-0"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-8"
                              />
                            </div>

                            <Tabs value={activeTab} onValueChange={handleTabChange}>
                              <TabsList className="grid grid-cols-2 w-full">
                                <TabsTrigger value="learners" className="text-xs sm:text-sm">Learners</TabsTrigger>
                                <TabsTrigger value="departments" className="text-xs sm:text-sm">Departments</TabsTrigger>
                              </TabsList>

                              <TabsContent value="learners" className="max-h-40 sm:max-h-48 overflow-y-auto">
                                {filteredLearners.length === 0 ? (
                                  <div className="text-center py-4 text-muted-foreground text-sm">
                                    No learners found
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    {learnerOptions.map((learner) => (
                                      <div
                                        key={learner.value}
                                        className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                                        onClick={() => handleItemSelect('learner', learner)}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-sm truncate">{learner.label}</p>
                                          <p className="text-xs text-muted-foreground truncate">
                                            {learner.badge}
                                          </p>
                                        </div>
                                        {selectedItems.some((item) => item.id === learner.value) && (
                                          <div className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0 ml-2" />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </TabsContent>

                              <TabsContent value="departments" className="max-h-40 sm:max-h-48 overflow-y-auto">
                                {filteredDepartments.length === 0 ? (
                                  <div className="text-center py-4 text-muted-foreground text-sm">
                                    No departments found
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    {departmentOptions.map((department) => (
                                      <div
                                        key={department.value}
                                        className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                                        onClick={() => handleItemSelect('department', department)}
                                      >
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-sm truncate">{department.label}</p>
                                          <p className="text-xs text-muted-foreground truncate">
                                            {department.badge}
                                          </p>
                                        </div>
                                        {selectedItems.some(
                                          (item) => item.id === department.value
                                        ) && <div className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0 ml-2" />}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </TabsContent>
                            </Tabs>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date (optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value ? 'text-muted-foreground' : ''
                              }`}
                            >
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                            disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any notes or instructions for the learners..."
                          className="resize-none h-20"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t bg-background">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      handleModalClose(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
                    disabled={form.formState.isSubmitting || selectedItems.length === 0}
                    onClick={() => {
                      console.log('🚀 ASSIGN COURSE BUTTON CLICKED >>>>:', {
                        formState: form.formState,
                        selectedItemsCount: selectedItems.length,
                        isDisabled: form.formState.isSubmitting || selectedItems.length === 0,
                      });
                    }}
                  >
                    Assign Course
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={showConfirmation}
        onOpenChange={(open) => {
          setShowConfirmation(open);
        }}
      >
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Assign Course</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              {submittedData?.assignees && (
                <>Assigned course to {submittedData.assignees.map((a) => a.name).join(', ')}.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
            <AlertDialogCancel
              className="w-full sm:w-auto"
              onClick={() => {
                setShowConfirmation(false);
              }}
            >
              No, Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
              onClick={() => {
                confirmAssignment();
              }}
            >
              Yes, Assign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showSuccessConfirmation}
        onOpenChange={(open) => setShowSuccessConfirmation(open)}
      >
        <AlertDialogContent className="w-[95vw] max-w-sm rounded-xl p-4 sm:p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <AlertDialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
            Course assigned successfully!
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-2 text-sm text-gray-600">
            You have successfully assigned this course.
          </AlertDialogDescription>

          <div className="mt-6">
            <AlertDialogAction
              className="w-full rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              onClick={() => setShowSuccessConfirmation(false)}
            >
              Close
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}