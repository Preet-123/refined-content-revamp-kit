
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MoreVertical, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const FacultyDiscussionPortal = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<string>("");

  const topics = [
    "Importance of Communication",
    "Impact of Social Media on Youth",
    "AI: Boon or Bane?",
    "Work-Life Balance",
    "Climate Change and Sustainability"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 border-b flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-indigo-900">
            Speak<span className="text-purple-600">Space</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="hidden md:flex">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
          <Button variant="destructive" size="sm">
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex flex-col space-y-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Faculty Discussion Portal</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Facilitate group discussions and personal interviews for students to develop their communication skills
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button className="bg-blue-500 hover:bg-blue-600 min-w-[100px]" size="lg">
              <Users className="mr-2 h-5 w-5" />
              GD
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 min-w-[100px]" size="lg">
              <UserPlus className="mr-2 h-5 w-5" />
              PI
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 min-w-[180px]" size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              Create Discussion
            </Button>
          </div>

          {/* Portal Content */}
          <Card className="shadow-md border-gray-200 overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              {/* Topic Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-indigo-900">Select a GD Topic</h2>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a topic for group discussion" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Time Selection */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-indigo-900">Schedule Discussion</h2>
                
                {/* Date Picker */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Input */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Select Time</Label>
                    <div className="relative">
                      <Input
                        id="time"
                        type="time"
                        value={timeValue}
                        onChange={(e) => setTimeValue(e.target.value)}
                        className="w-full"
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Schedule Discussion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FacultyDiscussionPortal;
