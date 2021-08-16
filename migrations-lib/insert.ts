import shell from "shelljs";
import path from "path";
import fs from "fs";

console.log("invoked", process.cwd());

type CopyOptions = {
  overwrite: boolean;
};

function copyFiles(
  filesList: string[],
  dest: string,
  options: CopyOptions = { overwrite: false },
) {
  filesList.forEach((file) => {
    console.log("Copying", file);

    if (options.overwrite) {
      shell.cp("-Rf", file, dest);
    } else {
      shell.cp("-Rn", file, dest);
    }
  });
}

function moveMigrations(
  libraryCwd: string = process.cwd(),
  userCwd: string | undefined = process.env.INIT_CWD,
): string[] {
  if (!userCwd) return [];

  const directoryPath = path.join(libraryCwd, "prisma/migrations");
  const files = fs.readdirSync(directoryPath);
  const filesToCopy = files
    .filter(
      (file) => !file.endsWith("_setup") && file !== "migration_lock.toml",
    )
    .map((file) => path.join(directoryPath, file));
  const targetDir = path.join(userCwd, "db/migrations");
  copyFiles(filesToCopy, targetDir);

  return filesToCopy;
}

function moveSchema(
  libraryCwd: string = process.cwd(),
  userCwd: string | undefined = process.env.INIT_CWD,
) {
  if (!userCwd) return;

  const source = path.join(libraryCwd, "prisma/schema.prisma");
  const target = path.join(userCwd, "db/prisma-new.prisma");
  copyFiles([source], target);
}

function mergeSchema(userCwd: string | undefined = process.env.INIT_CWD) {
  if (!userCwd) return;

  const base = path.join(userCwd, "db/schema.prisma");
  const changed = path.join(userCwd, "db/prisma-new.prisma");

  if (shell.exec(`git merge-file ${base} ${base} ${changed}`).code !== 0) {
    shell.echo("Error: Auto-merge failed");
  }
}

function autoApplyMigrations(
  userCwd: string | undefined = process.env.INIT_CWD,
) {
  if (!userCwd) return;

  if (shell.exec("npx blitz prisma migrate dev", { cwd: userCwd }).code !== 0) {
    shell.echo("Error: Applying migrations failed");
  }
}

function autoCommitChanges(
  migrationName: string,
  userCwd: string | undefined = process.env.INIT_CWD,
) {
  if (!userCwd) return;

  if (
    shell.exec(
      `git add . && git commit -am "New migrations applied: ${migrationName}"`,
      {
        cwd: userCwd,
      },
    ).code !== 0
  ) {
    shell.echo("Error: Applying migrations failed");
  }
}

const migrations = moveMigrations();
moveSchema();
mergeSchema();
autoApplyMigrations();
// autoCommitChanges(migrations.join(", "));
