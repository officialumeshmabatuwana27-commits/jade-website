import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="text-center px-4">
        <div className="font-display text-9xl font-bold text-jade-500/20 mb-4">
          404
        </div>
        <h1 className="font-display text-2xl font-bold text-charcoal mb-3">
          Page Not Found
        </h1>
        <p className="text-charcoal/50 text-sm mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-jade-500 hover:bg-jade-400 text-white rounded-full font-semibold text-sm transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
