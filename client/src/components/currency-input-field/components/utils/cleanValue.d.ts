export declare type CleanValueOptions = {
    value: string;
    decimalSeparator?: string;
    groupSeparator?: string;
    allowDecimals?: boolean;
    decimalsLimit?: number;
    allowNegativeValue?: boolean;
    turnOffAbbreviations?: boolean;
    prefix?: string;
};
/**
 * Remove prefix, separators and extra decimals from value
 */
export declare const cleanValue: ({ value, groupSeparator, decimalSeparator, allowDecimals, decimalsLimit, allowNegativeValue, turnOffAbbreviations, prefix, }: CleanValueOptions) => string;
