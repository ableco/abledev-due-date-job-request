import express from "express";
export default function createStuff({ request }: {
    request: express.Request;
}): {
    allUppercasedName: string;
};
