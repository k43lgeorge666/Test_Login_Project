import { expect, Locator, Page } from "@playwright/test";

export class LoginPage
{
    private readonly page:Page
    private readonly Username_field:Locator
    private readonly Password_field:Locator
    private readonly Submit_button:Locator
    private readonly Success_Message:Locator
    private readonly Incorrect_user_message:Locator
    private readonly Incorrect_password_message:Locator

    constructor(page:Page)
    {
        this.page = page
        this.Username_field = page.locator("#username")
        this.Password_field = page.locator("#password")
        this.Submit_button = page.locator("#submit")
        this.Success_Message = page.getByText("Congratulations student. You successfully logged in!")
        this.Incorrect_user_message = page.locator("#error")
        this.Incorrect_password_message = page.locator("#error")
    }

    async Login_User_account(user:string, passwd:string)
    {
        await this.Username_field.fill(user)
        await this.Password_field.fill(passwd)
        await this.Submit_button.click()
    }
    async Verify_user_success_login()
    {
        await expect(this.page).toHaveURL(/logged-in-successfully/)
        await expect(this.Success_Message).toBeVisible()
    }
    async Verify_incorrect_username()
    {
        await expect(this.Incorrect_user_message).toBeVisible()
        await expect(this.Incorrect_user_message).toHaveText("Your username is invalid!")
    }
    async Verify_incorrect_password()
    {
        await expect(this.Incorrect_password_message).toBeVisible()
        await expect(this.Incorrect_password_message).toHaveText("Your password is invalid!")
    }
}

