import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Github, GithubIcon, KanbanSquare, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const { setTheme } = useTheme();

  
  const router = useRouter();
  return (
    <>
      <nav className="bg-background p-2 border-b border-b-1 border-border">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Side */}
          <div className="flex flex-1 items-center">
            {/* Alternate Logo */}
            {/* <img src="/icon.png" alt="Agilify" className="h-5 w-5" /> */}
            <Button
              variant="ghost"
              className=" mr-4 p-2 py-4 h-8"
              onClick={() => router.push('/')}
            >
              <KanbanSquare className="fill-primary h-8 w-8" />
              <span className="font-bold text-xl ml-1">Agilify</span>
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 justify-end">
            <Button variant='ghost' size='icon' className="w-9 h-9 py-2 px-0" > <GithubIcon className="h-4 w-4"/></Button>
            {/* Dark Mode Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 py-2 px-0"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="h-9" variant="outline">
              Log in
            </Button>
            <Button className="h-9">Sign up</Button>
          </div>
        </div>
      </nav>
    </>
  );
}
