import express from "express";

export default function createStuff({ request }: { request: express.Request }) {
  return { allUppercasedName: (request.body.name as string).toUpperCase() };
}
