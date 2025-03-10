
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">HabitTrack</span>
        </Link>
        
        <div className="hidden md:flex md:flex-1 items-center justify-end">
          {!isAuthenticated ? (
            <>
              <Button variant="outline" asChild className="mr-2">
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="text-sm mr-2">
                <span className="text-muted-foreground">Hi, </span>
                <span className="font-medium">{user?.name || 'User'}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
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
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-2 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    className="justify-start" 
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
