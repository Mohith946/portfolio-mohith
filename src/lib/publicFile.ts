import { existsSync } from "node:fs";
import path from "node:path";

/** True if a file exists under /public (checked at build/render time on the server). */
export const publicFileExists = (src: string) =>
  existsSync(path.join(process.cwd(), "public", src));
