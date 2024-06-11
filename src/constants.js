import * as path from "path";

import dotenv from "dotenv";
dotenv.config();

// constants for the paths
export const SOURCE_PATH = path.resolve("src");
export const VIEWS_PATH = path.resolve(SOURCE_PATH, "views");
export const PUBLIC_PATH = path.resolve("public");

// export portnumber (backup is 3000 if not defined in .env file)
export const PORT = process.env.PORT || 3000;
    