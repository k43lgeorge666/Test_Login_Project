import { expect, Locator, Page } from "@playwright/test";

export class List_items_Page
{
   private readonly Practice_menu:Locator
   private readonly Test_exceptions_option:Locator 
   private readonly Add_button:Locator
   private readonly Row2_field:Locator
   private readonly Row2_save_button:Locator
   private readonly Row2_edit_button:Locator
   private readonly Row2_remove_button:Locator
   private readonly Add_item_message:Locator
   private readonly Remove_item_message: Locator

   constructor(page:Page)
   {
      this.Practice_menu = page.locator("#menu-item-20")
      this.Test_exceptions_option = page.getByText("Test Exceptions")
      this.Add_button = page.locator("//button[@id='add_btn']")
      this.Row2_field = page.locator("//div[@id='row2']//input[@type='text']")
      this.Row2_save_button = page.locator("//div[@id='row2']//button[@id='save_btn']")
      this.Row2_edit_button = page.locator("//div[@id='row2']//button[@id='edit_btn']")
      this.Row2_remove_button = page.locator("//button[@id='remove_btn']")
      this.Add_item_message = page.getByText("Row 2 was saved")
      this.Remove_item_message = page.getByText("Row 2 was removed")
        

   }

   //Add an item to the list
   //Verify the item is added to the list

   async Add_an_input_field()
   {
      await this.Practice_menu.click()
      await this.Test_exceptions_option.click()
      await this.Add_button.click()
   }

   async Add_item_to_list(food:string)
   {
      await this.Row2_field.fill(food)
      await this.Row2_save_button.click()
   }

   //This verifies an new item is added and when its edited
   async Verify_item_added()
   {
      await expect(this.Add_item_message).toBeVisible()
   }

   //Edit an item already added

   async Verify_item_edited(food:string)
   {
      await this.Row2_edit_button.click()
      await this.Row2_field.fill(food)
      await this.Row2_save_button.click()
   }

   //Remove an item already added.

   async Remove_an_item()
   {
      await this.Row2_remove_button.click()
   }
     
   //Verify the item was removed

   async Verify_item_removed()
   {
      await expect(this.Remove_item_message).toBeVisible()
   }

}