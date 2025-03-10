
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Calendar, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-habit-teal" />,
      title: 'Track Your Habits',
      description: 'Create and track daily, weekly, or custom habits to build a better you.'
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-habit-purple" />,
      title: 'See Your Progress',
      description: 'Visualize your growth with beautiful analytics and track your streaks.'
    },
    {
      icon: <Calendar className="h-10 w-10 text-habit-amber" />,
      title: 'Stay Consistent',
      description: 'Build consistency with streak tracking and achieve your long-term goals.'
    },
    {
      icon: <Award className="h-10 w-10 text-habit-pink" />,
      title: 'Achieve Your Goals',
      description: 'Transform your life by building positive habits that stick.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Build Better Habits,<br />
              <span className="text-habit-purple">One Day at a Time</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Track, manage, and visualize your daily habits to create lasting positive change in your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm border hover:border-habit-purple transition-all">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-habit-purple/10 rounded-full p-6 flex-shrink-0">
                    <span className="text-2xl font-bold text-habit-purple">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create Your Habits</h3>
                    <p className="text-muted-foreground">
                      Add the habits you want to develop or maintain. Categorize them and set your frequency goals.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-habit-teal/10 rounded-full p-6 flex-shrink-0">
                    <span className="text-2xl font-bold text-habit-teal">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Track Consistently</h3>
                    <p className="text-muted-foreground">
                      Check off your habits as you complete them each day. Build streaks and see your progress over time.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-habit-amber/10 rounded-full p-6 flex-shrink-0">
                    <span className="text-2xl font-bold text-habit-amber">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Analyze & Improve</h3>
                    <p className="text-muted-foreground">
                      View your statistics and trends to understand your patterns and improve your consistency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-habit-purple/10 to-habit-teal/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Better Habits?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Start your journey toward positive change today with HabitTrack.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Tracking Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
