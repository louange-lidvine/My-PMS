import EntryForm from "@/components/forms/EntryForm";
import ExitForm from "@/components/forms/ExitForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CarActions = () => {
    return (
        <Tabs defaultValue="entry" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="entry">Create car entry</TabsTrigger>
                <TabsTrigger value="exit">Create car exit</TabsTrigger>
            </TabsList>
            <TabsContent value="entry">
                <EntryForm />
            </TabsContent>
            <TabsContent value="exit">
                <ExitForm />
            </TabsContent>
        </Tabs>
    );
};

export default CarActions;
