import CommitGenerator from "@/components/commit-generator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div> */}
      <main className="container mx-auto mt-2 mb-4">
        <CommitGenerator />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.conventionalcommits.org/en/v1.0.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Conventional commit
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Angular commits docs
        </a>
      </footer>
    </div>
  );
}
