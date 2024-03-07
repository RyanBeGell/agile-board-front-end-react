// Card.js
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlignLeft, Copy, StickyNote, Trash } from 'lucide-react';
interface CardProps {
  title: string;
  description: string;
}

import { toast } from 'sonner';

const Card = ({ title, description }: CardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          className=" bg-card p-3 rounded shadow mb-2 text-sm
     w-full h-8 justify-start flex items-center hover:shadow-[inset_0_0_0_2px] hover:shadow-primary"
        >
          {title}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-start mb-4">
            <StickyNote className="mr-2 h-5 w-5" />
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="pl-0.5 text-xs">
                in list X
              </DialogDescription>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-start">
            <div className="col-span-3 flex items-start">
              <AlignLeft className="mr-2 h-4 w-4" />
              <div className="flex flex-col w-full">
                <Label className="mb-2">Description</Label>
                <Textarea placeholder="Type your description here." />
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-start">
              <Label className="mb-2 font-semibold text-xs">Actions</Label>
              <Button
                variant="outline"
                className="w-full h-8 justify-start flex items-center mb-2 text-xs p-2"
              >
                <Copy className="mr-2 h-4 w-4 " /> Copy
              </Button>
              <Button
                variant="outline"
                className="w-full h-8 justify-start flex items-center text-xs p-2"
                onClick={() =>
                  toast('Event has been created', {
                    description: 'Sunday, December 03, 2023 at 9:00 AM',
                    action: {
                      label: 'Undo',
                      onClick: () => console.log('Undo'),
                    },
                  })
                }
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
