import Link from "next/link";

export default function page() {
  return (
    <section
      className="w-screen h-screen flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 30% 40%, #FFF0D9 0%, #7AE2CF 55%, #f4f7f2 100%)",
      }}
    >
      <Link
        href="/"
        className="absolute top-6 left-6 text-lg z-10 hover:bg-amber-50 p-1 rounded-full transition duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1" />
        </svg>
      </Link>
      <p className="z-10 text-[var(--foreground)] animate-pulse">
        coming soon...
      </p>
    </section>
  );
}
