export interface EnterpriseBase {
    name: string;
    region: string;
    email: string;
    license: MSPLicense;
}

export interface Enterprise extends EnterpriseBase {
    enterprise_id: number;
    customers: Customer[];
}

export interface MSPLicense {
    is_trial: boolean;
    seats: number;
    products: Product[];
}

export interface Product {
    product_id: string;
    seats: number;
}

export interface Customer {
    enterprise_id: number;
    name: string;
    product_id: string;
    seats: number;
    users: number;
}

