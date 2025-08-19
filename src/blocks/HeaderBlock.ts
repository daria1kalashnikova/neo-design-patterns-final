/**
 * Блок відображення заголовка резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private data: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    // Додаємо ім'я, позицію та контакти
    header.innerHTML = `
      <h1>${this.data.fullName}</h1>
      <p><em>${this.data.title}</em></p>
      <p>${this.data.contacts.email} ${this.data.contacts.phone} ${this.data.contacts.location}</p>
    `;

    return header;
  }
}