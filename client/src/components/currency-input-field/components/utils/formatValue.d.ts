declare type Props = {
    /**
     * Value to format
     */
    value: number | string | undefined;
    /**
     * Decimal separator
     *
     * Default = '.'
     */
    decimalSeparator?: string;
    /**
     * Group separator
     *
     * Default = ','
     */
    groupSeparator?: string;
    /**
     * Turn off separators
     *
     * This will override Group separators
     *
     * Default = false
     */
    turnOffSeparators?: boolean;
    /**
     * Prefix
     */
    prefix?: string;
    /**
     * Allows to get formatted by indian numbering system
     *
     * Default = false
     */
    isIndianNumberSystem?: boolean;
};
/**
 * Format value with decimal separator, group separator and prefix
 */
export declare const formatValue: (props: Props) => string;
export {};
