import { PrismaClient } from "@prisma/client";
import express from "express";

export interface HostContext {
  db: PrismaClient;
}

export type RequestHostContext = HostContext & {
  request: express.Request;
  response: express.Response;
};
