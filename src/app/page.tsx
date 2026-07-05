// IMPORTS

import { Button } from "@/components/ui/button";
import Link from "next/link";

// COMPONENT
export default function Home() {
  return (
    <div className="flex gap-4">
      <Button asChild>
        <Link href="/demo/timeline">Demo Timeline</Link>
      </Button>
    </div>
  );
}
