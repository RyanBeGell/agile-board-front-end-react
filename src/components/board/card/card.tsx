// Card.js
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PopoverClose } from '@radix-ui/react-popover';

import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { AlignLeft, Copy, StickyNote, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          role="button"
          className=" bg-card p-3 shadow mb-2 text-sm
     w-full h-9 justify-start flex items-center hover:shadow-[inset_0_0_0_2px] hover:shadow-primary rounded-xl"
        >
          {title}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-start mb-4">
            <StickyNote className="mr-2 h-4 w-4" />
            <div>
              <DialogTitle className="text-left">{title}</DialogTitle>
              <DialogDescription>in list X</DialogDescription>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="col-span-3 flex items-start">
              <AlignLeft className="mr-2 h-4 w-4" />
              <div className="flex flex-col w-full text-left">
                <Label className="mb-2">Description</Label>
                <Textarea placeholder="Type your description here." />
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-start">
              <Label className="mb-2 font-semibold text-xs">Actions</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-8 justify-start flex items-center mb-2 text-xs p-2"
                  >
                    <Copy className="mr-2 h-4 w-4 " /> Copy
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-80">
                  <div className="grid gap-2">
                    <div className=" text-center">
                      <h4 className="font-medium leading-none">Copy Card</h4>
                    </div>
                    <div className="items-center">
                      <div className="grid w-full gap-1.5">
                        <Label htmlFor="message">Title</Label>
                        <Textarea placeholder="Your title here." id="message" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="copyTo">Copy to...</Label>
                      <Select>
                        <SelectTrigger className="w-full h-8">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                      <div className=" col-span-3">
                        <Select>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select a list" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>List</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-3">
                        <Select>
                          <SelectTrigger className=" h-8">
                            <SelectValue placeholder="Position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <PopoverClose asChild>
                        <Button
                          className="h-8 col-span-1 "
                          onClick={() =>
                            toast('Task has been copied to X', {
                              //show date in format "Sunday, December 03, 2023 at 9:00 AM"
                              description: `${new Date().toLocaleString(
                                'en-US',
                                {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true,
                                }
                              )}`,
                              action: {
                                label: 'Undo',
                                onClick: () => console.log('Undo'),
                              },
                            })
                          }
                        >
                          Create
                        </Button>
                      </PopoverClose>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-8 justify-start flex items-center text-xs p-2"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this task.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setOpen(false);
                        toast(`${title} has been deleted`, {
                          //show date in format "Sunday, December 03, 2023 at 9:00 AM"
                          description: `${new Date().toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}`,
                        });
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
