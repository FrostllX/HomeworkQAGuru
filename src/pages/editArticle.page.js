export class EditArticlePage {
   constructor (page) {
       this.titleInput = page.getByRole('textbox', { name: 'title' });
       this.descriptionInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
       this.bodyInput = page.getByRole('textbox', {name: 'Write your article (in markdown)'});
       this.tagsInput = page.getByRole('textbox', {name: 'Enter tags' });
       this.publishButton = page.getByRole('button', {name: 'Update Article'})
   }
    async editArticle(article) {
    const {title, description, body, tags} = article;
      await this.titleInput.click();
      await this.titleInput.fill(title);
      await this.descriptionInput.click();
      await this.descriptionInput.fill(description);
      await this.bodyInput.click();
      await this.bodyInput.fill(body);
      await this.tagsInput.click();
      await this.tagsInput.fill(tags);
      await this.publishButton.click();
    }
}