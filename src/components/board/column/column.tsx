// Column.js
import { customFetch } from '@/components/auth/CustomFetch';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card as CardInterface } from '@/types/interfaces';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import { PopoverClose } from '@radix-ui/react-popover';
import { MoreHorizontal, Plus, X } from 'lucide-react';
import { useState } from 'react';
import Card from '../card/card';

interface ColumnProps {
  title: string;
  cards: CardInterface[];
  columnId: string;
  onDelete: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, columnId, onDelete }) => {
  const [newCard, setNewCard] = useState<string>('');
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [cardList, setCardList] = useState<CardInterface[]>(cards);

  const { toast } = useToast();

  const handleAddCard = () => {
    setIsAddingCard(true);
  };

  const handleSaveCard = async () => {
    try {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cards/column/${columnId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            title: newCard,
            description: '', // Add other fields if necessary
            columnId,
            position: cardList.length, // Assuming position is the index
            dueDate: null,
            assigneeIds: [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedCard: CardInterface = await response.json();

      // Update the card list with the newly added card
      setCardList([...cardList, savedCard]);

      // Reset the new card input and close the input area
      setNewCard('');
      setIsAddingCard(false);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/columns/${columnId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast({
        title: `Column ${title} has been deleted`,
        description: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      });

      // Call the onDelete callback to update the state in the parent component
      onDelete(columnId);
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const handleCancelCard = () => {
    setIsAddingCard(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCard(e.target.value);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newCardList = Array.from(cardList);
    const [movedCard] = newCardList.splice(result.source.index, 1);
    newCardList.splice(result.destination.index, 0, movedCard);

    setCardList(newCardList);
    // Optionally, update the backend with the new positions here.
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={`column-${columnId}`}
        type="card"
        direction="vertical"
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-w-[284px] bg-accent p-4 rounded-md m-2"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold pl-3">{title}</h2>
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className=" h-8 w-8 hover:bg-background"
                  >
                    <MoreHorizontal className="h-4 w-4 " />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start">
                  <div className="relative flex items-center mb-2">
                    <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold">
                      List Actions
                    </div>
                    <PopoverClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-8 w-8 flex justify-center items-center"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </PopoverClose>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={'destructive'} className="w-full h-9">
                        Delete Column
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your column remove it's data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteColumn}>
                          {' '}
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </PopoverContent>
              </Popover>
            </div>
            {cardList.map((card, index) => (
              <Draggable
                key={card.id}
                draggableId={card.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card key={card.id} {...card} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {isAddingCard ? (
              <>
                <Textarea
                  value={newCard}
                  onChange={handleChange}
                  placeholder="Enter a title for this card..."
                />
                <div className="flex space-x-2 mt-2">
                  <Button className="h-9" size="sm" onClick={handleSaveCard}>
                    Add Card
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-9 hover:bg-background"
                    onClick={handleCancelCard}
                  >
                    <X />
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="p-3 text-sm w-full h-9 justify-start flex items-center text-muted-foreground rounded-md"
                onClick={handleAddCard}
                variant={'ghost'}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a card
              </Button>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Column;
