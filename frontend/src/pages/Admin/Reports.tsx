import EntryReport from "@/components/common/EntryReport";
import ExitReport from "@/components/common/ExitReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
    return (
        <Tabs defaultValue="entry" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="entry">Car Entry Report</TabsTrigger>
                <TabsTrigger value="exit">Car Exit Report</TabsTrigger>
            </TabsList>
            <TabsContent value="entry">
                <EntryReport />
            </TabsContent>
            <TabsContent value="exit">
                <ExitReport />
            </TabsContent>
        </Tabs>
    );
};

export default Reports;
