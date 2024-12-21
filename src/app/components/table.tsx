'use client';

import React from "react";
import {
    getKeyValue,
    SortDescriptor,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { UserTable } from "./user_table";
import { InputSearch } from "./input_search";

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

    // Filter
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

    //Sorting
    const sortedData = React.useMemo<User[]>(() => {
        if (!sortDescriptor) return filteredData;
        const { column, direction } = sortDescriptor;
        return [...filteredData].sort((a, b) => {
            const first = column === "id" ? parseInt(getKeyValue(a, column) as string) : getKeyValue(a, column);
            const second = column === "id" ? parseInt(getKeyValue(b, column) as string) : getKeyValue(b, column);
            const cmp: number =
                typeof first === "string" && typeof second === "string"
                    ? first.localeCompare(second)
                    : (first as number) - (second as number);
            return direction === "descending" ? cmp * -1 : cmp;
        });
    }, [filteredData, sortDescriptor]);

    //Pagination
    const pages = Math.ceil(sortedData.length / rowsPerPage);

    const items = React.useMemo<User[]>(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedData.slice(start, end);
    }, [page, sortedData]);

    async function handleExportToGoogleSheet() {
        try {
            const response = await fetch("/api/export_to_google_sheet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: filteredData }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Export successful! View your Google Sheet: ${result.sheetUrl}`);
            } else {
                alert(`Export failed: ${result.error}`);
            }
        } catch (error) {
            console.error("Error exporting data:", error);
            alert("An error occurred while exporting the data.");
        }
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <button
                onClick={handleExportToGoogleSheet}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Export to New Google Sheet
            </button>
            <div className="flex gap-4">
                <InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
