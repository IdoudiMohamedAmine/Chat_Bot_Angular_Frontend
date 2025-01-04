export class Chat {
  id: string;
  userId: string;
  title: string;

  constructor(data: { id: string, userId: string, title: string }) {
    this.id = data.id;
    this.userId = data.userId;
    // Clean the title by removing leading/trailing quotes and stripping outer single quotes
    this.title = data.title.replace(/^"|\"$/g, '').replace(/^'|'$/g, ''); 
  }
}