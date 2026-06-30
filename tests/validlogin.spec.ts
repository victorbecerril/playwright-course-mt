import { test } from "@playwright/test";
import { LoginPage } from "../pages"
import type { Market, User } from "../types/";
import marketJson from "../data/markets.json";
import usersJson from "../data/users.json";

const markets = marketJson as Market[];
const users = usersJson as User[];

const standardUser = users.find((u) => u.username === "standard_user");

// Guard clause
if (!standardUser) {
    throw new Error("data/users.json does not include a username called standard_user");
}

test.describe("POM - Login per market", () => {
    for (const market of markets) {
        //String Interpolation
        test(`TC-${market.code} - login + catalog in market ${market.code}`, { tag: "@smoke" }, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.navigateTo();
            await loginPage.loginAs(standardUser, market.code);
            await loginPage. expectUrlContains(/\/catalog/);
        })
    }
})