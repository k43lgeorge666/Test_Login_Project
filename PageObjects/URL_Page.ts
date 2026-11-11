import { expect, Locator, Page } from "@playwright/test";

export class URL_Page
{
    private readonly page:Page
    
    constructor(page:Page)
    {
        this.page = page
    }
    async GetURL()
    {
        await this.page.goto("https://practicetestautomation.com/")
    }
}