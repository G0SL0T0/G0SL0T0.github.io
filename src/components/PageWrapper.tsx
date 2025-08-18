// src/components/PageWrapper.tsx
'use client';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {children}
    </div>
  );
};

export default PageWrapper;