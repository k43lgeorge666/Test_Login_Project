import { expect, Locator, Page } from "@playwright/test";

export class List_Automation_Courses
{
    private readonly Sort_by_id:Locator
    private readonly Practice_menu:Locator
    private readonly Test_Table_Page_option:Locator
    private readonly First_id_value:Locator
    private readonly First_course_value:Locator
    private readonly First_language_value:Locator
    private readonly First_level_value:Locator
    private readonly First_enrollment_value:Locator
    
    constructor(page:Page)
    {
        this.Sort_by_id = page.locator("//select[@id='sortBy']")
        this.Practice_menu = page.locator("#menu-item-20")
        this.Test_Table_Page_option = page.getByText("Test Table")
        this.First_id_value = page.locator("//td[normalize-space()='1517620']")
        this.First_course_value = page.locator("//td[normalize-space()='Advanced Selenium']")
        this.First_language_value = page.locator("//td[normalize-space()='Any']")
        this.First_level_value = page.locator("//tbody/tr[1]/td[4]")
        this.First_enrollment_value = page.locator("//td[normalize-space()='1365']")

    }

    async List_all_courses_all_levels(sort_value:string)
    {
        await this.Practice_menu.click();
        await this.Test_Table_Page_option.click();
        await this.Sort_by_id.selectOption(sort_value)

    }

    async Verify_the_courses_are_sorted_by_ID()
    {
        await expect(this.First_id_value).toHaveText("1517620")
    }

    async Verify_the_courses_are_sorted_by_Course_name()
    {
        await expect(this.First_course_value).toHaveText("Advanced Selenium")
    }

    async Verify_the_courses_are_sorted_by_Language()
    {
        await expect(this.First_language_value).toHaveText("Any")
    }

    async Verify_the_courses_are_sorted_by_Level()
    {
        await expect(this.First_level_value).toHaveText("Advanced")
    }

    async Verify_the_courses_are_sorted_by_Enrollment()
    {
        await expect(this.First_enrollment_value).toHaveText("1365")
    }
}