
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Clock } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-[#e6f2ff]">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-indigo-900">
            Speak<span className="text-purple-600">Space</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="destructive" size="sm">
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4 max-w-3xl">
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button className="bg-blue-500 hover:bg-blue-600 min-w-[100px]" size="lg">
            GD
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 min-w-[100px]" size="lg">
            PI
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 min-w-[180px]" size="lg">
            Create Discussion
          </Button>
        </div>

        {/* Card Content */}
        <Card className="shadow-md border-gray-200 overflow-hidden transition-all hover:shadow-lg bg-white">
          <CardContent className="p-8">
            {/* Title and Description */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Faculty Discussion Portal</h1>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Engage in meaningful discussions on various topics. Select a topic for GD or create an interview link for PI.
              </p>
            </div>

            {/* Topic Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Select a GD Topic</h2>
              <RadioGroup value={selectedTopic} onValueChange={setSelectedTopic} className="space-y-3">
                {topics.map((topic) => (
                  <div key={topic} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value={topic} id={topic.replace(/\s+/g, '-').toLowerCase()} />
                    <Label htmlFor={topic.replace(/\s+/g, '-').toLowerCase()} className="cursor-pointer font-medium">
                      {topic}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Date Time Selection */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Select GD Start Time</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Date Picker */}
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

              <div className="pt-6 flex justify-center">
                <Button className="bg-indigo-600 hover:bg-indigo-700 px-8">
                  Schedule Discussion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FacultyDiscussionPortal;
