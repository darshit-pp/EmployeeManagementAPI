import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings,
  BarChart3,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    name: 'Employees', 
    href: '/employees', 
    icon: Users,
    subItems: [
      { name: 'All Employees', href: '/employees' },
      { name: 'Active Employees', href: '/employees?status=active' },
      { name: 'Add Employee', href: '/employees/new' },
    ]
  },
  { 
    name: 'Departments', 
    href: '/departments', 
    icon: Building2,
    subItems: [
      { name: 'All Departments', href: '/departments' },
      { name: 'Add Department', href: '/departments/new' },
    ]
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings 
  },
];

const NavigationItem = ({ item, isMobile = false, onItemClick }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = item.exact 
    ? location.pathname === item.href
    : location.pathname.startsWith(item.href);

  const hasSubItems = item.subItems && item.subItems.length > 0;

  if (hasSubItems) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              'flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center">
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6 mt-1 space-y-1">
          {item.subItems.map((subItem) => (
            <NavLink
              key={subItem.href}
              to={subItem.href}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                )
              }
            >
              {subItem.name}
            </NavLink>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <NavLink
      to={item.href}
      onClick={onItemClick}
      className={({ isActive }) =>
        cn(
          'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
          (isActive && item.exact) || (isActive && !item.exact)
            ? 'bg-primary text-primary-foreground'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        )
      }
    >
      <item.icon className="mr-3 h-5 w-5" />
      {item.name}
    </NavLink>
  );
};

// Desktop Navigation
export const DesktopNavigation = () => {
  return (
    <nav className="p-4 space-y-1">
      {navigation.map((item) => (
        <NavigationItem key={item.name} item={item} />
      ))}
    </nav>
  );
};

// Mobile Navigation
export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Navigation</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavigationItem 
              key={item.name} 
              item={item} 
              isMobile={true}
              onItemClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Navigation = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavigation />
      </div>
      <div className="md:hidden">
        <MobileNavigation />
      </div>
    </>
  );
};

export default Navigation;  