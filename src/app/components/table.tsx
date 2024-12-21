'use client';

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    SortDescriptor,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";

type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    city: string;
    country: string;
    country_code: string;
    state: string;
    street_address: string;
    job_title: string;
    company_name: string;
    photo: string;
};

type Props = {
    data: User[];
};

export default function TableComponent({ data }: Props) {
    const [page, setPage] = React.useState<number>(1);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor | null>(null);
    const [searchQuery, setSearchQuery] = React.useState<string>("");

    const rowsPerPage = 20;

    const filteredData = React.useMemo<User[]>(() => {
        if (!searchQuery) return data;

        return data.filter((user) => {
            const searchIn = `${user.first_name} ${user.last_name} ${user.email} ${user.city} ${user.country} ${user.job_title}`;
            return searchIn.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [data, searchQuery]);

    const sortedData = React.useMemo<User[]>(() => {
        if (!sortDescriptor) return filteredData;

        const { column, direction } = sortDescriptor;
        const sorted = [...filteredData].sort((a, b) => {
            const first = column === "id" ? parseInt(getKeyValue(a, column) as string) : getKeyValue(a, column);
            const second = column === "id" ? parseInt(getKeyValue(b, column) as string) : getKeyValue(b, column);

            let cmp: number =
                typeof first === "string" && typeof second === "string"
                    ? first.localeCompare(second)
                    : (first as number) - (second as number);

            return direction === "descending" ? cmp * -1 : cmp;
        });

        return sorted;
    }, [filteredData, sortDescriptor]);

    const pages = Math.ceil(sortedData.length / rowsPerPage);

    const items = React.useMemo<User[]>(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return sortedData.slice(start, end);
    }, [page, sortedData]);

    return (
        <div className="flex flex-col w-full gap-5">
            <div>
                <Input
                    label="Search"
                    placeholder="Enter your text"
                    type="text"
                    variant="bordered"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Table
                isStriped
                aria-label="Table with client-side pagination and sorting"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
                sortDescriptor={sortDescriptor || undefined}
                onSortChange={(descriptor) => setSortDescriptor(descriptor)}
            >
                <TableHeader>
                    <TableColumn key="id" allowsSorting>
                        ID
                    </TableColumn>
                    <TableColumn key="photo">Photo</TableColumn>
                    <TableColumn key="first_name" allowsSorting>
                        First Name
                    </TableColumn>
                    <TableColumn key="last_name" allowsSorting>
                        Last Name
                    </TableColumn>
                    <TableColumn key="email" allowsSorting>
                        Email
                    </TableColumn>
                    <TableColumn key="gender" allowsSorting>
                        Gender
                    </TableColumn>
                    <TableColumn key="city" allowsSorting>
                        City
                    </TableColumn>
                    <TableColumn key="country" allowsSorting>
                        Country
                    </TableColumn>
                    <TableColumn key="country_code" allowsSorting>
                        Country Code
                    </TableColumn>
                    <TableColumn key="state" allowsSorting>
                        State
                    </TableColumn>
                    <TableColumn key="street_address" allowsSorting>
                        Street Address
                    </TableColumn>
                    <TableColumn key="job_title" allowsSorting>
                        Job Title
                    </TableColumn>
                    <TableColumn key="company_name" allowsSorting>
                        Company Name
                    </TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>
                                <img
                                    src={item.photo}
                                    alt={`${item.first_name} ${item.last_name}`}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                    }}
                                />
                            </TableCell>
                            <TableCell>{item.first_name}</TableCell>
                            <TableCell>{item.last_name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.gender}</TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>{item.country}</TableCell>
                            <TableCell>{item.country_code}</TableCell>
                            <TableCell>{item.state}</TableCell>
                            <TableCell>{item.street_address}</TableCell>
                            <TableCell>{item.job_title}</TableCell>
                            <TableCell>{item.company_name}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
