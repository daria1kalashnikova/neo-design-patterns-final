/**
 * Блок відображення короткого опису резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SummaryBlock implements IBlock {
  constructor(private data: ResumeModel["summary"]) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section summary";

    // Додаємо заголовок і текст опису
    section.innerHTML = `
      <h2>Summary</h2>
      <p>${this.data.text}</p>
    `;

    return section;
  }
}