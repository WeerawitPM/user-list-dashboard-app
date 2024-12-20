'use client';

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
} from "@nextui-org/react";

import React from "react";

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
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 100;

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    return (
        <Table
            aria-label="Table with client-side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[400px]",
            }}
        >
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Photo</TableColumn>
                <TableColumn>First Name</TableColumn>
                <TableColumn>Last Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Gender</TableColumn>
                <TableColumn>City</TableColumn>
                <TableColumn>Country</TableColumn>
                <TableColumn>Country Code</TableColumn>
                <TableColumn>State</TableColumn>
                <TableColumn>Street Address</TableColumn>
                <TableColumn>Job Title</TableColumn>
                <TableColumn>Company Name</TableColumn>
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                            <img
                                src={item.photo}
                                alt={`${item.first_name} ${item.last_name}`}
                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
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
    );
}