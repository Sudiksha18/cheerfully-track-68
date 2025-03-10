
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  Users,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const NavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Statistics', href: '/statistics', icon: <BarChart2 className="h-5 w-5" /> },
  { title: 'Team', href: '/team', icon: <Users className="h-5 w-5" /> },
  { title: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-muted/20 border-r p-4 flex flex-col fixed left-0 top-0">
      <Link to="/" className="flex items-center mb-8 py-4">
        <span className="font-bold text-xl">HabitTrack</span>
      </Link>
      
      <div className="flex-1">
        <div className="space-y-1">
          {NavItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <div className="mr-2">{item.icon}</div>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <div className="mb-4 px-2">
          <div className="text-sm mb-1">Signed in as:</div>
          <div className="font-medium truncate">{user?.name || 'User'}</div>
          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
