// Column.js
import Card from './card';

const Column = ({ title, cards }: { title: string, cards: any[] }) => {
  return (
    <div className="min-w-[240px] bg-accent p-4 rounded m-2">
      <h2 className="font-bold mb-2">{title}</h2>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Column;
