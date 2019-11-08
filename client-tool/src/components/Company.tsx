import * as React from "react";

export interface CompanyProps {
  users?: string[];
}

export const Company: React.SFC<CompanyProps> = ({ users }) => {
  return (
    <div>{JSON.stringify(users)}</div>
  )
};
