
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock, Users, MessageSquare, Book, ChevronRight, BarChart3, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const FacultyDiscussionPortal = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string>("");
  const [discussionType, setDiscussionType] = useState<string>("gd");

  const topics = [
    "Importance of Communication",
    "Impact of Social Media on Youth",
    "AI: Boon or Bane?",
    "Work-Life Balance",
    "Climate Change and Sustainability"
  ];

  const upcomingDiscussions = [
    {
      title: "AI Ethics in Education",
      type: "Group Discussion",
      date: "Apr 15, 2025",
      time: "10:00 AM",
      participants: 12,
      icon: <BarChart3 className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "Student Assessment Techniques",
      type: "Personal Interview",
      date: "Apr 18, 2025",
      time: "2:30 PM",
      participants: 1,
      icon: <Users className="h-5 w-5 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Book className="h-7 w-7 text-indigo-600" />
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
              SpeakSpace
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-3 py-1 border-indigo-200 text-indigo-700 bg-indigo-50">
              Faculty Portal
            </Badge>
            <Avatar className="h-9 w-9 border-2 border-indigo-100">
              <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
              <AvatarFallback className="bg-indigo-100 text-indigo-700">FP</AvatarFallback>
            </Avatar>
            <Button variant="destructive" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Actions & Quick Stats */}
          <div className="space-y-6">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-indigo-800">Discussion Types</CardTitle>
                <CardDescription>Select the type of discussion you want to create</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className={`h-24 flex-col gap-2 ${discussionType === "gd" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`}
                    onClick={() => setDiscussionType("gd")}
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span>Group Discussion</span>
                  </Button>
                  
                  <Button 
                    className={`h-24 flex-col gap-2 ${discussionType === "pi" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`}
                    onClick={() => setDiscussionType("pi")}
                  >
                    <Users className="h-6 w-6" />
                    <span>Personal Interview</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-indigo-800">Upcoming Discussions</CardTitle>
                <CardDescription>Your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDiscussions.map((discussion, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-slate-100 hover:border-indigo-200 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          {discussion.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{discussion.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant={discussion.type === "Group Discussion" ? "default" : "outline"} className="text-xs px-1.5">
                              {discussion.type}
                            </Badge>
                            <span>•</span>
                            <span>{discussion.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <CardTitle className="text-2xl">Create New Discussion</CardTitle>
                <CardDescription className="text-indigo-100">
                  {discussionType === "gd" 
                    ? "Schedule a group discussion session for students"
                    : "Schedule a personal interview session with a student"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 space-y-8">
                {discussionType === "gd" ? (
                  <div className="space-y-6">
                    {/* Topic Selection */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-indigo-900">Select Discussion Topic</h3>
                      <RadioGroup value={selectedTopic} onValueChange={setSelectedTopic} className="space-y-3">
                        {topics.map((topic) => (
                          <div key={topic} className="flex items-center space-x-2 p-3 rounded-md border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors">
                            <RadioGroupItem value={topic} id={topic.replace(/\s+/g, '-').toLowerCase()} className="text-indigo-600" />
                            <Label htmlFor={topic.replace(/\s+/g, '-').toLowerCase()} className="cursor-pointer font-medium flex-1">
                              {topic}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Separator />

                    {/* Date Time Selection */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-indigo-900">Schedule Discussion</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date Picker */}
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-slate-300 hover:bg-slate-50",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                                {date ? format(date, "PPP") : <span>Select a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Time Input */}
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                          <div className="relative">
                            <Select value={timeValue} onValueChange={setTimeValue}>
                              <SelectTrigger className="w-full border-slate-300">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">1:00 PM</SelectItem>
                                <SelectItem value="14:00">2:00 PM</SelectItem>
                                <SelectItem value="15:00">3:00 PM</SelectItem>
                                <SelectItem value="16:00">4:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500" size={18} />
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
                          <Select defaultValue="60">
                            <SelectTrigger className="w-full border-slate-300">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="90">1.5 hours</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Max Participants */}
                        <div className="space-y-2">
                          <Label htmlFor="max-participants" className="text-sm font-medium">Maximum Participants</Label>
                          <Select defaultValue="10">
                            <SelectTrigger className="w-full border-slate-300">
                              <SelectValue placeholder="Max participants" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 students</SelectItem>
                              <SelectItem value="10">10 students</SelectItem>
                              <SelectItem value="15">15 students</SelectItem>
                              <SelectItem value="20">20 students</SelectItem>
                              <SelectItem value="25">25 students</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-indigo-900">Interview Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="student" className="text-sm font-medium">Student</Label>
                          <Select>
                            <SelectTrigger className="w-full border-slate-300">
                              <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student1">Aisha Khan</SelectItem>
                              <SelectItem value="student2">Rahul Sharma</SelectItem>
                              <SelectItem value="student3">Emma Wilson</SelectItem>
                              <SelectItem value="student4">James Chen</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="interview-type" className="text-sm font-medium">Interview Type</Label>
                          <Select defaultValue="technical">
                            <SelectTrigger className="w-full border-slate-300">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technical">Technical</SelectItem>
                              <SelectItem value="hr">Human Resources</SelectItem>
                              <SelectItem value="general">General Aptitude</SelectItem>
                              <SelectItem value="project">Project Presentation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Date Picker */}
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-slate-300 hover:bg-slate-50",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4 text-emerald-500" />
                                {date ? format(date, "PPP") : <span>Select a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Time Input */}
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                          <div className="relative">
                            <Select value={timeValue} onValueChange={setTimeValue}>
                              <SelectTrigger className="w-full border-slate-300">
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">1:00 PM</SelectItem>
                                <SelectItem value="14:00">2:00 PM</SelectItem>
                                <SelectItem value="15:00">3:00 PM</SelectItem>
                                <SelectItem value="16:00">4:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500" size={18} />
                          </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-sm font-medium">Duration</Label>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-full border-slate-300">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {/* Notes */}
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="notes" className="text-sm font-medium">Interview Notes</Label>
                          <Input
                            id="notes"
                            placeholder="Add any specific notes or instructions for this interview"
                            className="border-slate-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  {discussionType === "gd" ? (
                    <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-6 text-base font-medium">
                      Schedule Group Discussion
                    </Button>
                  ) : (
                    <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-base font-medium">
                      Schedule Interview
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDiscussionPortal;
