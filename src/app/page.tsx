// IMPORTS

import Link from "next/link";

// COMPONENT
export default function Home() {
  return (
    <div className="flex gap-4">
      <Link href="/demo/timeline">Demo Timeline</Link>
      <Link href="/demo/series">Demo Series</Link>
    </div>
  );
}
