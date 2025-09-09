import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Регистрация', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Регистрация пользователя', async ({
        page,
    }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        await mainPage.gotoRegister();
        await registerPage.register(user);
        await expect (mainPage.dropDown).toContainText(user.name)
    });
});


