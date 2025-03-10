
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Trash2, Edit, MoreVertical } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type Habit = {
  id: string;
  name: string;
  description?: string;
  category: 'health' | 'productivity' | 'learning' | 'personal';
  frequency: 'daily' | 'weekly' | 'custom';
  streak: number;
  completed: boolean;
  createdAt: Date;
  color?: 'purple' | 'teal' | 'amber' | 'pink' | 'slate';
};

interface HabitItemProps {
  habit: Habit;
  onToggleComplete: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
}

export const categoryColors = {
  health: 'habit-teal',
  productivity: 'habit-purple',
  learning: 'habit-amber',
  personal: 'habit-pink',
};

const HabitItem: React.FC<HabitItemProps> = ({ 
  habit, 
  onToggleComplete, 
  onDelete,
  onEdit 
}) => {
  const getCategoryColor = (category: string): string => {
    return categoryColors[category as keyof typeof categoryColors] || 'habit-slate';
  };

  return (
    <div 
      className={cn(
        "flex items-center p-4 rounded-lg border mb-3 transition-all",
        habit.completed ? "bg-muted border-muted" : "bg-card border-border hover:border-habit-purple"
      )}
    >
      <div className="flex-1 flex items-start gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onToggleComplete(habit.id)}
          className="text-foreground hover:text-habit-purple"
        >
          {habit.completed ? 
            <CheckCircle2 className="h-6 w-6 text-habit-purple" /> : 
            <Circle className="h-6 w-6" />
          }
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              "text-base font-medium",
              habit.completed && "text-muted-foreground line-through"
            )}>
              {habit.name}
            </h3>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full bg-habit-purple/10 text-habit-purple",
              `bg-${getCategoryColor(habit.category)}/10 text-${getCategoryColor(habit.category)}`
            )}>
              {habit.category}
            </span>
          </div>
          {habit.description && (
            <p className={cn(
              "text-sm text-muted-foreground",
              habit.completed && "text-muted-foreground/60"
            )}>
              {habit.description}
            </p>
          )}
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Streak: {habit.streak}</span>
              {habit.streak > 0 && 
                <span className="inline-block px-1 animate-pulse-slow">🔥</span>
              }
            </div>
            <span className="mx-2">•</span>
            <span>{habit.frequency}</span>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(habit)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(habit.id)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HabitItem;
