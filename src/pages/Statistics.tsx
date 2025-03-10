import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  BarChart2, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { Habit } from '@/components/HabitItem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Statistics: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  const categoryData = habits.reduce((acc, habit) => {
    acc[habit.category] = (acc[habit.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const frequencyData = habits.reduce((acc, habit) => {
    acc[habit.frequency] = (acc[habit.frequency] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const frequencyChartData = Object.entries(frequencyData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  const streakData = habits.map(habit => ({
    name: habit.name.length > 15 ? habit.name.substring(0, 15) + '...' : habit.name,
    value: habit.streak
  }));

  const completionData = [
    { name: 'Completed', value: habits.filter(h => h.completed).length },
    { name: 'Pending', value: habits.filter(h => !h.completed).length }
  ];

  const generateWeeklyData = () => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return daysOfWeek.map(day => {
      return {
        name: day,
        Completed: Math.floor(Math.random() * (habits.length + 1)),
        Total: habits.length
      };
    });
  };

  const weeklyData = generateWeeklyData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Statistics</h1>
          <p className="text-muted-foreground mt-1">
            Visualize and analyze your habit data
          </p>
        </div>

        {habits.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                You don't have any habits yet. Add some habits to see your statistics.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Habit Completion</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={completionData}
                          dataKey="value"
                          nameKey="name"
                          fill="#8B5CF6"
                          label
                        />
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Categories</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryChartData}
                          dataKey="value"
                          nameKey="name"
                          fill="#0EA5E9"
                          label
                        />
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Frequency</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={frequencyChartData}
                          dataKey="value"
                          nameKey="name"
                          fill="#F97316"
                          label
                        />
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="streaks">
              <TabsList className="mb-4">
                <TabsTrigger value="streaks" className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Streaks
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center">
                  <LineChartIcon className="h-4 w-4 mr-2" />
                  Weekly Trend
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="streaks">
                <Card>
                  <CardHeader>
                    <CardTitle>Habit Streaks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={streakData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8B5CF6" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="weekly">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={weeklyData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="Completed" stroke="#0EA5E9" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Statistics;
