import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Column<T> = {
    key: keyof T;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export function DataTable<T extends { [key: string]: any }>({
    columns,
    data,
}: DataTableProps<T>) {
    return (
        <div className="rounded-2xl w-full h-fit border shadow-md overflow-auto">
            <Table className="w-full text-sm text-left">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        {columns.map((col) => (
                            <TableHead
                                key={col.key as string}
                                className="px-4 py-3"
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i} className="hover:bg-gray-50">
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key as string}
                                    className="px-4 py-3"
                                >
                                    {col.render
                                        ? col.render(row[col.key], row)
                                        : row[col.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
