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
    gender: string; // gender added
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
    const [genderFilter, setGenderFilter] = React.useState<string | { target: { value: string } }>("");
    const [cityFilter, setCityFilter] = React.useState<string | { target: { value: string } }>("");
    const [countryFilter, setCountryFilter] = React.useState<string | { target: { value: string } }>("");
    const [companyFilter, setCompanyFilter] = React.useState<string | { target: { value: string } }>("");

    const rowsPerPage = 20;

    // Extract unique genders from data
    const uniqueGenders = Array.from(new Set(data.map(user => user.gender)));
    const uniqueCities = Array.from(new Set(data.map(user => user.city)));
    const uniqueCountries = Array.from(new Set(data.map(user => user.country)));
    const uniqueCompanies = Array.from(new Set(data.map(user => user.company_name)));

    const filteredData = React.useMemo<User[]>(() => {
        let filtered = data;
        if (searchQuery) {
            filtered = filtered.filter(user => (
                `${user.first_name} ${user.last_name} ${user.email} ${user.city} ${user.country} ${user.job_title}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            ));
        }

        if (typeof genderFilter === 'object' && genderFilter.target?.value !== undefined && genderFilter.target.value !== "") {
            filtered = filtered.filter(user => user.gender === genderFilter.target.value);
        }

        if (typeof cityFilter === 'object' && cityFilter.target?.value !== undefined && cityFilter.target.value !== "") {
            filtered = filtered.filter(user => user.city === cityFilter.target.value);
        }

        if (typeof countryFilter === 'object' && countryFilter.target?.value !== undefined && countryFilter.target.value !== "") {
            filtered = filtered.filter(user => user.country === countryFilter.target.value);
        }

        if (typeof companyFilter === 'object' && companyFilter.target?.value !== undefined && companyFilter.target.value !== "") {
            filtered = filtered.filter(user => user.company_name === companyFilter.target.value);
        }

        return filtered;
    }, [data, searchQuery, genderFilter, cityFilter, countryFilter, companyFilter]);

    const sortedData = React.useMemo<User[]>(() => {
        if (!sortDescriptor) return filteredData;
        const { column, direction } = sortDescriptor;
        return [...filteredData].sort((a, b) => {
            const first = column === "id" ? parseInt(getKeyValue(a, column) as string) : getKeyValue(a, column);
            const second = column === "id" ? parseInt(getKeyValue(b, column) as string) : getKeyValue(b, column);
            let cmp: number =
                typeof first === "string" && typeof second === "string"
                    ? first.localeCompare(second)
                    : (first as number) - (second as number);
            return direction === "descending" ? cmp * -1 : cmp;
        });
    }, [filteredData, sortDescriptor]);

    const pages = Math.ceil(sortedData.length / rowsPerPage);

    const items = React.useMemo<User[]>(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedData.slice(start, end);
    }, [page, sortedData]);

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex gap-4">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Select
                    label="Filter by Gender"
                    value={typeof genderFilter === 'string' ? genderFilter : genderFilter.target.value}
                    onChange={setGenderFilter}
                >
                    {uniqueGenders.map(gender => (
                        <SelectItem key={gender} value={gender}>
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Filter by City"
                    value={typeof cityFilter === 'string' ? cityFilter : cityFilter.target.value}
                    onChange={setCityFilter}
                >
                    {uniqueCities.map(city => (
                        <SelectItem key={city} value={city}>
                            {city.charAt(0).toUpperCase() + city.slice(1)}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Filter by Country"
                    value={typeof countryFilter === 'string' ? countryFilter : countryFilter.target.value}
                    onChange={setCountryFilter}
                >
                    {uniqueCountries.map(country => (
                        <SelectItem key={country} value={country}>
                            {country.charAt(0).toUpperCase() + country.slice(1)}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Filter by Company"
                    value={typeof companyFilter === 'string' ? companyFilter : companyFilter.target.value}
                    onChange={setCompanyFilter}
                >
                    {uniqueCompanies.map(company => (
                        <SelectItem key={company} value={company}>
                            {company.charAt(0).toUpperCase() + company.slice(1)}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <UserTable
                data={items}
                setSortDescriptor={setSortDescriptor}
                sortDescriptor={sortDescriptor}
                page={page}
                setPage={setPage}
                totalPages={pages}
            />
        </div>
    );
}

const SearchBar: React.FC<{ searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }> = ({ searchQuery, setSearchQuery }) => (
    <Input
        label="Search"
        placeholder="Enter your text"
        type="text"
        variant="bordered"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
);

const UserTable: React.FC<{
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
