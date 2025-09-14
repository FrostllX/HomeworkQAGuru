import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, ProfilePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Профиль пользователя', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Проверка имени пользователя в профиле', async ({
        page,
    }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const profilePage = new ProfilePage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);
        await mainPage.gotoProfile()
        await expect (profilePage.profileName).toContainText(user.name)
    });
});
