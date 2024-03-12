import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Check,
  ChevronsUpDown,
  Github,
  KanbanSquare,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { setTheme } = useTheme();

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];

  //placeholder for user initials
  const initials = 'RB';
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
              className=" mr-4 p-2 h-8"
              onClick={() => router.push('/')}
            >
              <KanbanSquare  className=" h-8 w-8 fill-primary" />
              <span className="font-bold text-xl ml-1">Agilify</span>
            </Button>
            <Button className="h-9">Create</Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 justify-end">
            {/* Combobox */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between h-9"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : 'Workspaces'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === framework.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {/* Github Repo Icon */}
            <Button variant="outline" size="icon" className="w-9 h-9 py-2 px-0">
              <Github className="h-4 w-4" />
            </Button>
            {/* Dark Mode Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
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
            {/* Avatar */}
            <div className="h-8 w-8 p-1 rounded-full flex items-center justify-center font-bold text-white bg-primary">
              {initials}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
