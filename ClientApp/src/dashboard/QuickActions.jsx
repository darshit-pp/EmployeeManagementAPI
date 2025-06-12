import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="flex space-x-2">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Employee
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button variant="outline">
        <Upload className="mr-2 h-4 w-4" />
        Import
      </Button>
    </div>
  );
};

export default QuickActions;