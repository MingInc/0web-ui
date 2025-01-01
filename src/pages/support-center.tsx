"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";

interface SupportCase {
  _id: string;
  ticketInfo: {
    title: string;
  };
  status: string;
  createdAt: string;
}

export default function SupportCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCaseDescription, setNewCaseDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [cases, setCases] = useState<SupportCase[]>([]);

  useEffect(() => {
    // Fetch cases from API or load from local storage
    const mockCases: SupportCase[] = [
      {
        _id: "1",
        ticketInfo: { title: "Issue 1" },
        status: "open",
        createdAt: "2023-04-01T12:00:00Z",
      },
      {
        _id: "2",
        ticketInfo: { title: "Issue 2" },
        status: "closed",
        createdAt: "2023-04-02T14:30:00Z",
      },
    ];
    setCases(mockCases);
  }, []);

  const filteredCases = cases.filter((c) =>
    c.ticketInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileURL(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setFileURL(null);
  };

  const createNewCase = () => {
    setCreating(true);
    // Simulate API call
    setTimeout(() => {
      const newCase: SupportCase = {
        _id: Date.now().toString(),
        ticketInfo: { title: newCaseTitle },
        status: "open",
        createdAt: new Date().toISOString(),
      };
      setCases([...cases, newCase]);
      setNewCaseTitle("");
      setNewCaseDescription("");
      setFileName(null);
      setFileURL(null);
      setCreating(false);
    }, 1000);
  };

  return (
    <div className="min-h-[60vh] w-full sm:w-[80vw] mx-auto">
      <div className="">
        <CardHeader>
          <CardTitle className="text-2xl">Support Center</CardTitle>
          <CardDescription>
            Create and view support cases for your projects.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="relative w-full sm:w-64">
              <i className="ri-search-2-line absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"></i>
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <i className="ri-add-line mr-2 h-4 w-4"></i>
                  Create a new case
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Support Case</DialogTitle>
                  <DialogDescription>
                    Provide details about the issue you're experiencing.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newCaseTitle}
                      onChange={(e) => setNewCaseTitle(e.target.value)}
                      placeholder="Brief description of the issue"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCaseDescription}
                      onChange={(e) => setNewCaseDescription(e.target.value)}
                      placeholder="Provide more details about your issue"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="file" onChange={handleFileChange} />
                    {fileURL && (
                      <div className="relative mt-2 w-40 h-40">
                        <img
                          src={fileURL}
                          alt={fileName || "Selected file"}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {fileName && (
                      <input
                        type="text"
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        value={fileName}
                        readOnly
                      />
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      disabled={creating}
                      onClick={createNewCase}
                    >
                      Submit Case
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="transferred">Transferred</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            {["all", "open", "transferred", "closed"].map((status) => (
              <TabsContent key={status} value={status}>
                {filteredCases.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No cases yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create a new case to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCases
                      .filter((c) => status === "all" || c.status === status)
                      .reverse()
                      .map((supportCase) => {
                        const date = new Date(supportCase.createdAt);
                        const formattedDate = date.toLocaleString();

                        return (
                          <div className="px-4" key={supportCase._id}>
                            <div>
                              <p>
                                {supportCase.ticketInfo.title}
                              </p>
                              <p>
                                Case ID: {supportCase._id}
                              </p>
                            </div>
                            <p className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Status: {supportCase.status}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formattedDate}
                              </span>
                            </p>
                            <hr className="mt-2"/>
                          </div>
                        );
                      })}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </div>
    </div>
  );
}
