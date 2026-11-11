import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/URL_Page'
import { LoginPage } from '../../PageObjects/Login/LoginPage'

const username = "student"
const password = "Password123"
const wrong_user = "admin1"
const wrong_passwd = "pass"
const waiting_time = 5000
const success_url = "https://practicetestautomation.com/logged-in-successfully/"

test('Verify Login User Successful',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    await get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User_account(username,password)
    await page.waitForTimeout(waiting_time)
    await expect(page).toHaveURL(success_url)
    await login_user.Verify_user_success_login()
})

test('Verify login user fails with an incorrect username',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    await get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User_account(wrong_user,password)
    await page.waitForTimeout(waiting_time)
    await login_user.Verify_incorrect_username()
})

test('Verify login user fails with an incorrect password',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    await get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User_account(username,wrong_passwd)
    await page.waitForTimeout(waiting_time)
    await login_user.Verify_incorrect_password()
})
