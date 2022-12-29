var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient({
    log: ["query"]
});
const port = 3232;
app.get("/games", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany();
    // return res.json(games)
    return res.json({ games });
}));
app.get("/", (req, res) => {
    console.log("Teste");
    return res.json({ message: "Api funcionando novamente" });
});
app.listen(port);
