import shells from "shelljs";
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
      shells.cp("-Rf", file, dest);
    } else {
      shells.cp("-Rn", file, dest);
    }
  });
}

function moveMigrations() {
  const directoryPath = path.join(process.cwd(), "prisma/migrations");

  const files = fs.readdirSync(directoryPath);

  console.log("files", files);

  const filesToCopy = files
    .filter(
      (file) => !file.endsWith("_setup") && file !== "migration_lock.toml",
    )
    .map((file) => path.join(directoryPath, file));

  const userPath = process.env.INIT_CWD;

  console.log("userPath", userPath);
  console.log("filesToCopy", filesToCopy);

  if (userPath) {
    const targetDir = path.join(userPath, "db/migrations");
    copyFiles(filesToCopy, targetDir);
  }
}

moveMigrations();
