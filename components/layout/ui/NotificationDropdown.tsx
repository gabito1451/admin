'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className }: NotificationDropdownProps) {
  const { t } = useTranslation('common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`navbar__notification-trigger ${className}`}
          style={{
            backgroundColor: '#fff7f0',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/assets/icons/bell.svg"
            alt="Notification Bell"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span className="sr-only">{t('navbar.notifications')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="navbar__notification-dropdown" sideOffset={8}>
        <DropdownMenuLabel className="navbar__notification-header">
          <span className="font-semibold text-gray-900">{t('navbar.notifications')}</span>
          <span className="navbar__notification-count">{t('navbar.newNotifications')}</span>
        </DropdownMenuLabel>

        <div className="max-h-80 overflow-y-auto">
          <DropdownMenuItem className="navbar__notification-item">
            <div className="flex items-start gap-3 w-full">
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-900">
                  {t('navbar.newCourseSubmitted')}
                </span>
                <p className="text-xs text-gray-600 mt-1">{t('navbar.newCourseSubmittedDesc')}</p>
                <span className="text-xs text-gray-400 mt-2">
                  {t('navbar.timeAgo.minutes', { count: 2 })}
                </span>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="navbar__notification-item">
            <div className="flex items-start gap-3 w-full">
              <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-900">
                  {t('navbar.learnerCompleted')}
                </span>
                <p className="text-xs text-gray-600 mt-1">{t('navbar.learnerCompletedDesc')}</p>
                <span className="text-xs text-gray-400 mt-2">
                  {t('navbar.timeAgo.hour', { count: 1 })}
                </span>
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="navbar__notification-item">
            <div className="flex items-start gap-3 w-full">
              <div className="h-2 w-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-900">
                  {t('navbar.courseApprovalNeeded')}
                </span>
                <p className="text-xs text-gray-600 mt-1">{t('navbar.courseApprovalNeededDesc')}</p>
                <span className="text-xs text-gray-400 mt-2">
                  {t('navbar.timeAgo.hours', { count: 3 })}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-0" />
        <DropdownMenuItem className="navbar__notification-view-all">
          <span className="text-sm font-medium" style={{ color: '#FF8000' }}>
            {t('navbar.viewAllNotifications')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
