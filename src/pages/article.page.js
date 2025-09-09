export class ArticlePage {
   constructor (page) {
       this.articleTitle = page.locator('.banner');
       this.articleBody = page.locator('.row.article-content')
       this.articleTags = page.locator('.tag-list')
       this.articleAuthor = page.locator('.author').nth(1);
       this.editArticleLink = page.locator('.ion-edit').nth(1);
       this.commentInput = page.getByRole('textbox', {name: 'Write a comment...' });
       this.postCommentButton = page.getByRole('button', {name: 'Post Comment'})
       this.commentAuthor = page.locator('.comment-author').nth(1);
   }
    async addComment(comment) {
    const { text } = comment;
     await this.commentInput.click();
     await this.commentInput.fill(text);
     await this.postCommentButton.click();
    } 
    async gotoeditArticleLink() {
      await this.editArticleLink.click();
    }
}