import { Page } from "@playwright/test";
import { step } from "../Helper/steps-decor";

export class NavigationPage {
  constructor(private page: Page) {

  }

    @step
    async petTypesPage() {
    
      await this.page.locator('a[href="/pettypes"]').click();
    }

}