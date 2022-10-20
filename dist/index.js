"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const servicosRoutes_1 = __importDefault(require("./Routes/servicosRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use('/', servicosRoutes_1.default);
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
