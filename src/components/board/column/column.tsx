// Column.js
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Card from '../card/card';

const Column = ({ title, cards }: { title: string; cards: any[] }) => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="cards" type="card" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-w-[240px] bg-accent p-4 rounded m-2"
          >
            <h2 className="font-bold mb-2">{title}</h2>
            {cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Column;
