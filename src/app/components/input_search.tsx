import { Input } from "@nextui-org/react";

export const InputSearch: React.FC<{ searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }> = ({ searchQuery, setSearchQuery }) => (
    <Input
        label="Search"
        placeholder="Enter your text"
        type="text"
        variant="bordered"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
);
