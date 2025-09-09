import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, SettingsPage, ProfilePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Изменение данных', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Изменение данных пользователя', async ({
        page,
    }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        const userSettings = {
            imageLink: faker.image.urlPicsumPhotos(),
            name: faker.person.fullName(),
            bio: faker.person.bio(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const profilePage = new ProfilePage(page);
        const settingsPage = new SettingsPage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);
        await mainPage.gotoSettings();
        await settingsPage.changeSettings(userSettings);
        await mainPage.gotoProfile();
        await expect (profilePage.profileName).toContainText(userSettings.name)
        await expect (profilePage.profileName).toContainText(userSettings.bio)
    });
});
