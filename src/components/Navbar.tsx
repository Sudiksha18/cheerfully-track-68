
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Statistics', href: '/statistics', icon: <BarChart2 className="h-5 w-5" /> },
  { title: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">HabitTrack</span>
        </Link>
        
        <div className="hidden md:flex md:flex-1 items-center justify-between">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {NavItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary flex items-center"
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="default" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link to="/" className="flex items-center space-x-2 mb-8">
                <span className="font-bold text-xl">HabitTrack</span>
              </Link>
              <nav className="grid gap-6 text-lg font-medium">
                {NavItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="flex items-center gap-2 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
