import { Suspense } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-[50%] left-[50%]  translate-[-50%]">
        <div className="px-3  flex flex-col  justify-center py-2  w-[300px]  rounded-[5px]">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
}
