import express from "express";
import { PrismaClient } from "@prisma/client";
export interface HostContext {
    db: PrismaClient;
}
export interface RequestHostContext extends HostContext {
    request: express.Request;
    response: express.Response;
}
