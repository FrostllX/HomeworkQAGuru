import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, AddArticlePage, ArticlePage  } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Добавление новой статьи', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Добавление новой статьи', async ({
        page,
    }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        const article = {
            title: faker.internet.displayName(),
            description: faker.book.title(),
            body: faker.book.format(),
            tags: faker.internet.displayName()
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const addArticlePage = new AddArticlePage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);
        await mainPage.gotoArticle();
        await addArticlePage.addArticle(article);
        await expect (articlePage.articleTitle).toContainText(article.title);
        await expect (articlePage.articleAuthor).toContainText(user.name);
        await expect (articlePage.articleBody).toContainText(article.body);
        await expect (articlePage.articleTags).toContainText(article.tags);
    });
});
