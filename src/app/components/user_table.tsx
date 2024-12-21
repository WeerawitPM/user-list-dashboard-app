import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    SortDescriptor,
} from "@nextui-org/react";
import Image from "next/image";

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

export const UserTable: React.FC<{
    data: User[];
    setSortDescriptor: React.Dispatch<React.SetStateAction<SortDescriptor | null>>;
    sortDescriptor: SortDescriptor | null;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}> = ({ data, setSortDescriptor, sortDescriptor, page, setPage, totalPages }) => (
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
                    total={totalPages}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>
        }
        classNames={{ wrapper: "min-h-[222px]" }}
        sortDescriptor={sortDescriptor || undefined}
        onSortChange={(descriptor) => setSortDescriptor(descriptor)}
    >
        <TableHeader>
            <TableColumn key="id" allowsSorting>ID</TableColumn>
            <TableColumn key="photo">Photo</TableColumn>
            <TableColumn key="first_name" allowsSorting>First Name</TableColumn>
            <TableColumn key="last_name" allowsSorting>Last Name</TableColumn>
            <TableColumn key="email" allowsSorting>Email</TableColumn>
            <TableColumn key="gender" allowsSorting>Gender</TableColumn>
            <TableColumn key="city" allowsSorting>City</TableColumn>
            <TableColumn key="country" allowsSorting>Country</TableColumn>
            <TableColumn key="country_code" allowsSorting>Country Code</TableColumn>
            <TableColumn key="state" allowsSorting>State</TableColumn>
            <TableColumn key="street_address" allowsSorting>Street Address</TableColumn>
            <TableColumn key="job_title" allowsSorting>Job Title</TableColumn>
            <TableColumn key="company_name" allowsSorting>Company Name</TableColumn>
        </TableHeader>
        <TableBody items={data}>
            {item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                        <Image
                            src={item.photo}
                            width={50}
                            height={50}
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
