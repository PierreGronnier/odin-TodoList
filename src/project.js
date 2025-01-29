export default class Project {
  constructor(title, description) {
      this.title = title;
      this.description = description;
      this.id = Date.now().toString();
  }
}