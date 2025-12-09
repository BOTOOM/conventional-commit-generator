import { Suspense } from "react";
import { Github } from "lucide-react";
import CommitGenerator from "@/components/commit-generator";
import { CommitTypesPanel } from "@/components/commit-types-panel";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 text-center flex-1">
              Conventional Commit Generator
            </h1>
            <a
              href="https://github.com/BOTOOM/conventional-commit-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="ml-4">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub Repository</span>
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Commit Types */}
          <CommitTypesPanel />
          
          {/* Right Column - Generator Form */}
          <Suspense fallback={<div className="h-full animate-pulse bg-gray-200 rounded-lg" />}>
            <CommitGenerator />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
