import { Icon } from "@iconify/react";
import React, { ChangeEvent, FC } from "react";

interface formSearchProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormSearch: FC<formSearchProps> = ({ value, handleChange }) => {
  return (
    <div className="bg-subprimary flex items-center max-w-2xl  w-full px-4 rounded-md overflow-hidden">
      <Icon icon="mdi:magnify" width="20" height="20" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        className="rounded-md text-sm outline-none px-2 h-[48px] w-full bg-subprimary"
      />
    </div>
  );
};

export default FormSearch;
