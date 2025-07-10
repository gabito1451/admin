'use client';
import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import '@/styles/layout/sidebar.css';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  titleKey: string;
  href: string;
  iconPath: string;
  submenu?: { titleKey: string; href: string }[];
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  const navItems: NavItem[] = [
    {
      titleKey: 'navigation.dashboard',
      href: '/dashboard',
      iconPath: '/assets/icons/dashboard.svg',
    },
    {
      titleKey: 'navigation.courses',
      href: '/dashboard/courses',
      iconPath: '/assets/icons/courses.svg',
    },
    {
      titleKey: 'navigation.learners',
      href: '/dashboard/learners',
      iconPath: '/assets/icons/learners.svg',
    },
    {
      titleKey: 'navigation.instructors',
      href: '/dashboard/instructors',
      iconPath: '/assets/icons/instructor.svg',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      const result = pathname === href;

      return result;
    }
    const result = pathname.startsWith(href);

    return result;
  };

  return (
    <aside className={cn('sidebar sidebar--compact', className)}>
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navItems.map((item) => {
            const isItemActive = isActive(item.href);
            const translatedTitle = t(item.titleKey);

            return (
              <li key={item.titleKey} className="sidebar__nav-item">
                <Link
                  href={item.href}
                  className={cn(
                    'sidebar__link sidebar__link--compact',
                    isItemActive ? 'sidebar__link--active' : 'sidebar__link--inactive'
                  )}
                >
                  <div className="sidebar__content sidebar__content--compact">
                    <div className="sidebar__icon">
                      <Image
                        src={item.iconPath}
                        alt={`${translatedTitle} Logo`}
                        width={20}
                        height={20}
                        className={cn(
                          'sidebar__icon-image sidebar__icon-image--compact',
                          isItemActive && 'sidebar__icon--active'
                        )}
                      />
                    </div>
                    <span className="sidebar__text sidebar__text--compact">{translatedTitle}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="sidebar__gradient" />
    </aside>
  );
}
