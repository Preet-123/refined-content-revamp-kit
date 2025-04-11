import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  duration: number;
  participants: number;
}

const GroupDiscussion = () => {
  // Mock data for upcoming sessions
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "Interview Preparation: Behavioral Questions",
      description: "Practice answering common behavioral interview questions with real-time feedback.",
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      duration: 45,
      participants: 4,
    }
  ]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSession: Session = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      startTime: new Date(startTime),
      duration,
      participants: 1, // Creator is the first participant
    };
    
    setSessions([newSession, ...sessions]);
    
    // Reset form
    setTitle("");
    setDescription("");
    setStartTime("");
    setDuration(60);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10" />
        
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          >
            Group Discussion <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Sessions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-8"
          >
            Schedule or join collaborative discussion sessions to practice with peers and receive real-time feedback.
          </motion.p>
        </div>
      </section>
      
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Create New Session Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center">
                    <Plus className="mr-2 h-6 w-6 text-blue-600" />
                    Schedule a New Session
                  </CardTitle>
                  <CardDescription>
                    Create a new discussion group for practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Session Title
                      </label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Interview Practice, Public Speaking"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What will participants practice in this session?"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="startTime" className="text-sm font-medium flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-blue-600" />
                          Start Date & Time
                        </label>
                        <Input
                          id="startTime"
                          type="datetime-local"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-blue-600" />
                          Duration (minutes)
                        </label>
                        <Input
                          id="duration"
                          type="number"
                          min="15"
                          max="180"
                          step="15"
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                          required
                        />
                      </div>
                    </div>
                  
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Create Session
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Upcoming Sessions List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="shadow-md h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="mr-2 h-6 w-6 text-blue-600" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>
                    Join an existing discussion group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {sessions.length > 0 ? (
                      sessions.map((session) => (
                        <motion.div
                          key={session.id}
                          whileHover={{ y: -2 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-lg text-blue-900">{session.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{session.participants} joined</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{session.description}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm">
                            <div className="flex items-center text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(session.startTime)}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{session.duration} minutes</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Button 
                              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm"
                            >
                              <MessageSquare className="mr-1.5 h-4 w-4" />
                              Join Discussion
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No upcoming sessions. Be the first to create one!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupDiscussion;
