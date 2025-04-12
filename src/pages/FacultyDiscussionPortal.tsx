
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const FacultyDiscussionPortal = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");

  const topics = [
    "Importance of Communication",
    "Impact of Social Media on Youth",
    "AI: Boon or Bane?",
    "Work-Life Balance",
    "Climate Change and Sustainability"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-900">
          Speak<span className="text-purple-600">Space</span>
        </div>
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button className="bg-blue-500 hover:bg-blue-600 px-6">
            GD
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 px-6">
            PI
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600">
            Create Discussion
          </Button>
        </div>

        {/* Portal Content */}
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Faculty Discussion Portal</h1>
                <p className="text-gray-600">
                  Engage in meaningful discussions on various topics. Select a topic for GD or create an interview link for PI.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-center mb-4">Select a GD Topic</h2>
                <RadioGroup
                  value={selectedTopic}
                  onValueChange={setSelectedTopic}
                  className="space-y-3"
                >
                  {topics.map((topic) => (
                    <div key={topic} className="flex items-center space-x-2">
                      <RadioGroupItem value={topic} id={topic.replace(/\s+/g, '-').toLowerCase()} />
                      <Label htmlFor={topic.replace(/\s+/g, '-').toLowerCase()} className="cursor-pointer">
                        {topic}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="mb-6">
                <Label htmlFor="startTime" className="block mb-2">Select GD Start Time</Label>
                <div className="relative">
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="dd-mm-yyyy --:--"
                    className="pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
