
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HabitList from '@/components/HabitList';
import HabitStats from '@/components/HabitStats';
import AddHabitForm from '@/components/AddHabitForm';
import HabitItem, { Habit } from '@/components/HabitItem';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [
      {
        id: '1',
        name: 'Morning Exercise',
        description: '30 minutes of cardio or strength training',
        category: 'health',
        frequency: 'daily',
        streak: 3,
        completed: false,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Read a Book',
        description: 'Read at least 20 pages',
        category: 'learning',
        frequency: 'daily',
        streak: 5,
        completed: false,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Drink Water',
        description: 'Drink 8 glasses of water throughout the day',
        category: 'health',
        frequency: 'daily',
        streak: 7,
        completed: true,
        createdAt: new Date()
      }
    ];
  });

  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (newHabit: Omit<Habit, 'id' | 'streak' | 'completed' | 'createdAt'>) => {
    const habit: Habit = {
      ...newHabit,
      id: uuidv4(),
      streak: 0,
      completed: false,
      createdAt: new Date()
    };
    
    setHabits([...habits, habit]);
    toast({
      title: "Habit Added",
      description: `"${habit.name}" has been added to your habits.`,
    });
  };

  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
    toast({
      title: "Habit Updated",
      description: `"${updatedHabit.name}" has been updated.`,
    });
    setEditingHabit(null);
  };

  const handleToggleComplete = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completed;
        const newStreak = wasCompleted ? habit.streak - 1 : habit.streak + 1;
        
        return {
          ...habit,
          completed: !wasCompleted,
          streak: newStreak >= 0 ? newStreak : 0
        };
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (habitId: string) => {
    const habitToDelete = habits.find(h => h.id === habitId);
    
    setHabits(habits.filter(habit => habit.id !== habitId));
    
    if (habitToDelete) {
      toast({
        title: "Habit Deleted",
        description: `"${habitToDelete.name}" has been removed from your habits.`,
      });
    }
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsAddHabitOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Habits</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your daily habits
            </p>
          </div>
          <Button 
            onClick={() => {
              setEditingHabit(null);
              setIsAddHabitOpen(true);
            }}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Habit
          </Button>
        </div>

        <HabitStats habits={habits} />
        
        <HabitList 
          habits={habits} 
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteHabit}
          onEdit={handleEditHabit}
        />
        
        <AddHabitForm 
          open={isAddHabitOpen} 
          onOpenChange={setIsAddHabitOpen}
          onAddHabit={handleAddHabit}
          editingHabit={editingHabit}
          onUpdateHabit={handleUpdateHabit}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
