'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ClientOnlyBody({ children, className }: ClientOnlyBodyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <body className={className}>{children}</body>;
  }

  return (
    <body className={className} suppressHydrationWarning>
      {children}
    </body>
  );
}
