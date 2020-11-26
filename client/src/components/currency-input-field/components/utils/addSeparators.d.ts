/**
 * Add group separator to value eg. 1000 > 1,000
 */
export declare const addSeparators: ({ value, separator, isIndianNumberSystem, }: {
    value: string;
    separator?: string | undefined;
    isIndianNumberSystem?: boolean | undefined;
}) => string;
