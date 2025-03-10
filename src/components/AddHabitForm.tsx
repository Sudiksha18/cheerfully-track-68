
import React, { useState } from 'react';
import { Habit } from './HabitItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AddHabitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completed' | 'createdAt'>) => void;
  editingHabit: Habit | null;
  onUpdateHabit: (habit: Habit) => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ 
  open, 
  onOpenChange, 
  onAddHabit, 
  editingHabit,
  onUpdateHabit 
}) => {
  const [name, setName] = useState(editingHabit?.name || '');
  const [description, setDescription] = useState(editingHabit?.description || '');
  const [category, setCategory] = useState<Habit['category']>(editingHabit?.category || 'productivity');
  const [frequency, setFrequency] = useState<Habit['frequency']>(editingHabit?.frequency || 'daily');

  React.useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setDescription(editingHabit.description || '');
      setCategory(editingHabit.category);
      setFrequency(editingHabit.frequency);
    } else {
      setName('');
      setDescription('');
      setCategory('productivity');
      setFrequency('daily');
    }
  }, [editingHabit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    if (editingHabit) {
      onUpdateHabit({
        ...editingHabit,
        name,
        description: description || undefined,
        category,
        frequency,
      });
    } else {
      onAddHabit({
        name,
        description: description || undefined,
        category,
        frequency,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Exercise, Read, Meditate..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any details about your habit..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={category} 
                  onValueChange={(value) => setCategory(value as Habit['category'])}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select 
                  value={frequency} 
                  onValueChange={(value) => setFrequency(value as Habit['frequency'])}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {editingHabit ? 'Update Habit' : 'Add Habit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitForm;
