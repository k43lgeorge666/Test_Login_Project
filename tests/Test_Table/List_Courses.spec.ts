import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/URL_Page'
import { List_Automation_Courses } from '../../PageObjects/Test_Table/List_Automation_Courses'


const waiting_time = 1000

test('Verify any automation course with any language sorted by ID is listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_all_courses_all_levels("col_id")
    await page.waitForTimeout(waiting_time)
    await list_courses.Verify_the_courses_are_sorted_by_ID()
})

test('Verify any automation course with any language sorted by Course name is listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_all_courses_all_levels("col_course")
    await page.waitForTimeout(waiting_time)
})

test('Verify any automation course with any language sorted by language is listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_all_courses_all_levels("col_lang")
    await page.waitForTimeout(waiting_time)
})

test('Verify any automation course with any language sorted by level is listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_all_courses_all_levels("col_level")
    await page.waitForTimeout(waiting_time)
})

test('Verify any automation course with any language sorted by enrollment is listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_all_courses_all_levels("col_enroll")
    await page.waitForTimeout(waiting_time)
})