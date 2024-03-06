import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Layout, Users, Calendar, Settings, Plus } from 'lucide-react';

// Adjusted dummy data with icons
const workspaces = [
  { id: '1', name: 'Project Planning', icon: Layout },
  { id: '2', name: 'Team Overview', icon: Users },
  { id: '3', name: 'Calendar', icon: Calendar },
  { id: '4', name: 'Settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  // Function to handle adding a new workspace (to be implemented)
  const handleAddWorkspace = () => {
    console.log('Add new workspace');
  };

  return (
    <div className="w-64 h-full flex flex-col bg-background">
      <div className="pl-2 flex justify-between items-center mb-2">
        <h2 className="text-xs font-bold">Workspaces</h2>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="flex items-center justify-center p-2 h-8 w-8"
          onClick={handleAddWorkspace}
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      <div className="flex-1">
        {workspaces.map((workspace, index) => (
          <Accordion type="single" key={workspace.id} collapsible>
            <AccordionItem value={`item-${index}`} className="border-b-0 ">
              <AccordionTrigger className="text-sm h-10">
                <div className="flex items-center">
                  <div className="bg-black rounded-md p-1 mr-2 ">
                    <workspace.icon className="h-5 w-5 text-white" />
                  </div>
                  {workspace.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                {/* Indent here for visual hierarchy */}
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    className="h-8 flex items-center justify-start w-full mb-2"
                  >
                    <Layout className=" h-5 mr-2" /> Boards
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-8 flex items-center justify-start w-full"
                  >
                    <Settings className="h-5 mr-2" /> Settings
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
