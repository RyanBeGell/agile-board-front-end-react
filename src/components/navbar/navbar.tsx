'use client';

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
  fetchWorkspaces,
  selectWorkspace,
} from '@/app/workspace/workspace-slice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import {
  Check,
  ChevronsUpDown,
  Github,
  KanbanSquare,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface Workspace {
  id: number;
  name: string;
  icon: string; // Change this to the correct type if 'icon' is an enum or specific string type
}

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const workspaces = useAppSelector(
    (state: RootState) => state.workspaces.workspaces
  ); // Adjust according to your state structure
  const [open, setOpen] = React.useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<string>('');
  const { setTheme } = useTheme();
  const router = useRouter();
  const initials = 'RB'; // Placeholder for user initials
  const currentWorkspace = useAppSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [dispatch]);

  const handleSelectWorkspace = (id: string, name: string) => {
    dispatch(selectWorkspace(id));
    setOpen(false); // Close the popover on selection
  };

  return (
    <nav className="bg-background p-2 border-b border-b-1 border-border">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-1 items-center">
            <Button
              variant="ghost"
              className="mr-4 p-2 py-4 h-9 -ml-2"
              onClick={() => router.push('/dashboard')}
            >
              <KanbanSquare className="h-8 w-8 fill-primary" />
              <span className="font-bold text-xl ml-1">Agilify</span>
            </Button>
            <Button className="h-9">Create</Button>
          </div>
          <div className="flex items-center space-x-2 justify-end">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between h-9"
                >
                  {currentWorkspace
                    ? currentWorkspace.name
                    : 'Select Workspace'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Workspaces..." />
                  <CommandEmpty>No workspaces found.</CommandEmpty>
                  <CommandGroup>
                    {workspaces.map((workspace) => (
                      <CommandItem
                        key={workspace.id}
                        onSelect={() =>
                          handleSelectWorkspace(workspace.id, workspace.name)
                        }
                        className="relative flex items-center px-1 py-1.5 text-sm cursor-default select-none"
                      >
                        <div className="absolute left-0 pl-2 flex items-center justify-center">
                          <Check
                            className={`h-4 w-4 ${
                              currentWorkspace &&
                              workspace.id === currentWorkspace.id
                                ? 'opacity-100'
                                : 'opacity-0'
                            }`}
                          />
                        </div>
                        <span className="ml-8">{workspace.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" className="w-9 h-9 py-2 px-0">
              <Github className="h-4 w-4" />
            </Button>
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
            <div className="h-8 w-8 p-1 rounded-full flex items-center justify-center font-bold text-white bg-primary">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
