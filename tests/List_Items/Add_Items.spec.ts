import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/URL_Page'
import { List_items_Page } from '../../PageObjects/Test_Exceptions/List_items_Page'


const food = "Hamburguer"
const edited_food = "Roast Beef"
const waiting_time = 5000

test('Verify a new item is added to the list',async({page})=>
{
    const get_url = new URL_Page(page)
    const List_items = new List_items_Page(page)

    await get_url.GetURL()
    await List_items.Add_an_input_field()
    await page.waitForTimeout(waiting_time)
    await List_items.Add_item_to_list(food)
    await List_items.Verify_item_added()
})

test('Verify an existed item is edited',async({page})=>
{
    const get_url = new URL_Page(page)
    const List_items = new List_items_Page(page)

    await get_url.GetURL()
    await List_items.Add_an_input_field()
    await page.waitForTimeout(waiting_time)
    await List_items.Add_item_to_list(food)
    await List_items.Verify_item_edited(edited_food)
    await List_items.Verify_item_added()
})



