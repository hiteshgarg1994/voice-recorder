export class Notes {
  title: string;
  content: string;
  time: string;
  navTime: string;
  navContent: string;

  constructor(notes?:any) {
    notes = notes || {};
    this.content = notes.content || '';
    this.title = notes.title || 'New Note';
    this.time = notes.time || (new Date()).toJSON();
    this.navContent = notes.navContent || 'No additional text';
  }
}
