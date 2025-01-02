import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TemplateCard from "@/components/TemplateCard";
import { useNavigate } from "react-router-dom";
import ConfigureProject from "@/components/ConfigureProject.component";

export default function EnhancedProjects() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:row-span-2 px-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="ri-settings-line mr-2"></i> Configure Project
            </CardTitle>
          </CardHeader>

          <ConfigureProject />
        </Card>

        <Card className="md:self-start">
          <CardHeader>
            <CardTitle className="flex items-center">
            <i className="ri-file-line mr-2"></i> Clone Template
            </CardTitle>
            <CardDescription>
              Jumpstart your app development process with our pre-built Ming
              templates, starters, and themes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="next">Next.js</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <TemplateCard />
              </TabsContent>
              <TabsContent value="react">
                <TemplateCard />
              </TabsContent>
              <TabsContent value="next">
                <TemplateCard />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate("/dashboard/boilerplates");
              }}
            >
              Browse All Templates
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
