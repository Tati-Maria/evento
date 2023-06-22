import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div
      className="space-y-4 text-center"
      >
        <Image alt="404" src="/images/404.svg" width={400} height={400} />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <Link 
        className="text-lg border-b-2 border-dashed border-gray-500 hover:border-gray-700 inline-block"
        href="/">Go back home</Link>
      </div>
    </div>
  );
}
