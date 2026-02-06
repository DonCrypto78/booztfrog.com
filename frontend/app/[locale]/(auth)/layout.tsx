import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-4 py-12">
      <div className="mb-8">
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="BooztFrog"
            width={178}
            height={35}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
