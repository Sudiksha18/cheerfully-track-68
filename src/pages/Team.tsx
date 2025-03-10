
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Plus, Search, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

const Team: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const savedMembers = localStorage.getItem('teamMembers');
    return savedMembers ? JSON.parse(savedMembers) : [
      {
        id: '1',
        name: 'Alex Johnson',
        role: 'Team Lead',
        email: 'alex@example.com',
        avatar: '',
      },
      {
        id: '2',
        name: 'Jamie Smith',
        role: 'Developer',
        email: 'jamie@example.com',
        avatar: '',
      },
      {
        id: '3',
        name: 'Morgan Lee',
        role: 'Designer',
        email: 'morgan@example.com',
        avatar: '',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteTeamMember = () => {
    toast({
      title: "Invitation Sent",
      description: "Your team member will receive an email invitation.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AuthenticatedLayout>
      <main className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their access
            </p>
          </div>
          <Button 
            onClick={handleInviteTeamMember}
            className="mt-4 md:mt-0"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Team Member
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search team members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <Card key={member.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-sm">{member.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="pt-6">
              <Button variant="ghost" className="w-full h-full py-8 flex flex-col items-center justify-center" onClick={handleInviteTeamMember}>
                <Plus className="h-8 w-8 mb-2" />
                <span>Add Team Member</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </AuthenticatedLayout>
  );
};

export default Team;
