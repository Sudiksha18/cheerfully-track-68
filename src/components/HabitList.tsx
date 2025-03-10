
import React from 'react';
import HabitItem, { Habit } from './HabitItem';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface HabitListProps {
  habits: Habit[];
  onToggleComplete: (habitId: string) => void;
  onDelete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
}

const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  onToggleComplete, 
  onDelete,
  onEdit 
}) => {
  const pendingHabits = habits.filter(habit => !habit.completed);
  const completedHabits = habits.filter(habit => habit.completed);

  if (habits.length === 0) {
    return (
      <Alert variant="default" className="mt-4 bg-muted/50">
        <Info className="h-4 w-4" />
        <AlertDescription>
          You don't have any habits yet. Add your first habit to get started!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Pending ({pendingHabits.length})</h2>
        {pendingHabits.length === 0 ? (
          <Alert variant="default" className="bg-muted/50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              All caught up! You've completed all your habits for today.
            </AlertDescription>
          </Alert>
        ) : (
          <div>
            {pendingHabits.map(habit => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
      
      {completedHabits.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Completed ({completedHabits.length})</h2>
          <div>
            {completedHabits.map(habit => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitList;
