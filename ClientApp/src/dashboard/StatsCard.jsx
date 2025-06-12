import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// eslint-disable-next-line no-unused-vars
const StatsCard = ({ title, value, icon: Icon, description, color }) => {
  const colorVariants = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100',
  };

  return (
    // Replace the Card styling with:
<Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-soft hover:shadow-glow transition-all duration-300">
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        <p className="text-xs text-slate-500 mt-2">{description}</p>
      </div>
      <div className={cn('p-3 rounded-xl', colorVariants[color])}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </CardContent>
</Card>
  );
};

export default StatsCard;