// Column.js
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import Card from '../card/card';
import { Card as CardInterface } from '@/types/interfaces';


interface ColumnProps {
  title: string;
  cards: CardInterface[];
  columnId: string;
}


const Column: React.FC<ColumnProps> = ({ title, cards, columnId }) => {
  const [newCard, setNewCard] = useState<string>('');
  const [isAddingCard, setIsAddingCard] = useState<boolean>(false);
  const [cardList, setCardList] = useState<CardInterface[]>(cards);

  const handleAddCard = () => {
    setIsAddingCard(true);
  };

  const handleSaveCard = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cards/column/${columnId}`, {
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
      });

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
      <Droppable droppableId={`column-${columnId}`} type="card" direction="vertical">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-w-[284px] bg-accent p-4 rounded-md m-2"
          >
            <h2 className="font-bold mb-2">{title}</h2>
            {cardList.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
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