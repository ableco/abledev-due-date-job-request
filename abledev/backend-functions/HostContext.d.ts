import { PrismaClient } from "@prisma/client";
import express from "express";
export interface HostContext {
    db: PrismaClient;
}
export declare type RequestHostContext = HostContext & {
    request: express.Request;
    response: express.Response;
};
