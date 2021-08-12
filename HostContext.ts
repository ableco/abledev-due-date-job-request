import express from "express";
import { PrismaClient } from "@prisma/client";

// TODO: Make it extend from a type provided by us that already includes Request and Response
export type HostContext = {
  request: express.Request;
  response: express.Response;
  db: PrismaClient;
};
