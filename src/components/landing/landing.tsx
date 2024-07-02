import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
interface LandingProps {
  className?: string;
}

export default function Landing() {
  return (
    <div className="flex flex-col flex-grow">
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full ">
          <div className="container flex flex-col items-center text-center justify-center 2xl:space-y-16 space-y-12 px-4 md:px-6 my-8">
              <div className="flex justify-center">
                <div className="bg-muted py-1 px-2 rounded-md inline-flex items-center">
                  <span className="text-sm">🛠️</span>
                  <span
                    role="none"
                    className="bg-border dark:bg-muted-foreground w-[1px] mx-2 h-4 inline-block"
                  ></span>
                  <a
                    href="https://github.com/RyanBeGell/agile-board-front-end-react"
                    className="text-xs font-semibold flex items-center"
                    target='_blank'
                  >
                    {' '}
                    {/* Changed from <p> to <div> */}
                    Built with React, Springboot, TailwindCSS and more
                    <span className="inline-flex items-center ml-1">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>
              <h1 className="text-6xl font-bold tracking-tighter md:text-5xl lg:text-7xl xl:text-7xl 2xl:text-8xl">
                <span className="gradient-text">Agilify </span> your project
                workflow
              </h1>
              <p className="mx-auto max-w-[600px] xl:max-w-[1000px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-base/relaxed 2xl:text-xl/relaxed dark:text-gray-400">
                The platform for rapid progress. Designed for individuals and
                teams seeking efficiency without the clutter, Agilify
                streamlines your projects, tasks, and deadlines into a clear,
                manageable workflow.
              </p>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="btn-glow">
                  Try Agilify now
                </Button>
                <Button variant={'outline'} size="lg">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
