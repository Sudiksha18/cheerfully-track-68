
import React from 'react';
import { Habit } from './HabitItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Flame, LineChart, TrendingUp } from 'lucide-react';

interface HabitStatsProps {
  habits: Habit[];
}

const HabitStats: React.FC<HabitStatsProps> = ({ habits }) => {
  // Calculate statistics
  const totalHabits = habits.length;
  const completedHabits = habits.filter(habit => habit.completed).length;
  const completionRate = totalHabits > 0 
    ? Math.round((completedHabits / totalHabits) * 100) 
    : 0;
  
  // Calculate highest streak
  const highestStreak = habits.length > 0 
    ? Math.max(...habits.map(habit => habit.streak)) 
    : 0;
  
  // Calculate category distribution
  const categories = habits.reduce((acc, habit) => {
    acc[habit.category] = (acc[habit.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-habit-purple" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <Progress value={completionRate} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {completedHabits} of {totalHabits} habits completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Flame className="h-4 w-4 mr-2 text-habit-amber" />
            Highest Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highestStreak} days</div>
          <div className="mt-1 h-2"></div>
          <p className="text-xs text-muted-foreground mt-2">
            Keep going to increase your streak!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <LineChart className="h-4 w-4 mr-2 text-habit-teal" />
            Weekly Average
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalHabits > 0 ? (completionRate / 100 * 7).toFixed(1) : '0'}/7
          </div>
          <div className="mt-1 h-2"></div>
          <p className="text-xs text-muted-foreground mt-2">
            Average habits completed per week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Award className="h-4 w-4 mr-2 text-habit-pink" />
            Top Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{topCategory}</div>
          <div className="mt-1 h-2"></div>
          <p className="text-xs text-muted-foreground mt-2">
            {categories[topCategory] || 0} habits in this category
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitStats;
