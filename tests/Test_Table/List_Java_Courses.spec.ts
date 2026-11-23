import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/URL_Page'
import { List_Automation_Courses } from '../../PageObjects/Test_Table/List_Automation_Courses'



const waiting_time = 1000

test('Verify all Java courses in all levels sorted by ID are listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_java_courses_in_all_levels("col_id")
    await page.waitForTimeout(waiting_time)
    await list_courses.Verify_the_courses_are_sorted_by_ID()
})

test('Verify all Java courses in all levels sorted by Course name are listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_java_courses_in_all_levels("col_course")
    await page.waitForTimeout(waiting_time)
    await list_courses.Verify_the_courses_are_sorted_by_Java_course_name()
})

test('Verify all Java courses in all levels sorted by language are listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_java_courses_in_all_levels("col_lang")
    await page.waitForTimeout(waiting_time)
    await list_courses.Verify_the_courses_are_sorted_by_Java_Language_only()
})

test('Verify all Java courses in all levels sorted by Level are listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_java_courses_in_all_levels("col_level")
    await page.waitForTimeout(waiting_time)
    await list_courses.Verify_the_courses_are_sorted_by_Java_Level_only()
})

test('Verify all Java courses in all levels sorted by Enrollments are listed',async({page})=>
{
    const get_url = new URL_Page(page)
    const list_courses = new List_Automation_Courses(page)

    await get_url.GetURL()
    await list_courses.List_java_courses_in_all_levels("col_enroll")
    await page.waitForTimeout(waiting_time)
    await list_courses.Verify_the_courses_are_sorted_by_Java_Enrollments_only()
})