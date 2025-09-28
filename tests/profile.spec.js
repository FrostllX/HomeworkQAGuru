import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, ProfilePage, RegisterPage} from '../src/pages/index';

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


test.describe('Профиль пользователя', () => {
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
        const settingsPage = new ProfilePage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);
        await mainPage.gotoSettings();
        await settingsPage.changeSettings(userSettings);
        await mainPage.gotoProfile();
        await expect (profilePage.profileName).toContainText(userSettings.name)
        await expect (profilePage.profileName).toContainText(userSettings.bio)
    });
});