export default function someQuery(): {
    data: {
        x: number;
        y: number;
        z: number;
        a: number;
        b: number;
        c: number;
    };
    otherData?: undefined;
} | {
    otherData: {
        a: number;
        b: number;
    };
    data?: undefined;
};
