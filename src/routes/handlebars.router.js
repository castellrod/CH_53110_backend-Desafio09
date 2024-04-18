import express from 'express';
/*import path from 'path';
import fs from 'fs';*/
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();



export { router };