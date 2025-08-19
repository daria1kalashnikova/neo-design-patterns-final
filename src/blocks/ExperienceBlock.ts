/**
 * Патерн Composite (Компоновщик)
 *
 * Блок досвіду роботи, який містить дочірні блоки проєктів
 */

import { Experience } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private data: Experience[]) {}

  render(): HTMLElement {
    const container = document.createElement("section");
    container.className = "section experience";
    container.innerHTML = "<h2>Experience</h2>";

    // Для кожного досвіду створюємо div.experience-item
    for (const exp of this.data) {
      const expDiv = document.createElement("div");
      expDiv.className = "experience-item";
      expDiv.innerHTML = `
        <strong>${exp.position}</strong> at <em>${exp.company}</em> (${exp.start} - ${exp.end})
      `;

      // Додаємо проєкти до цього div
      for (const project of exp.projects) {
        const projectBlock = new ProjectBlock(project);
        let projectElement = projectBlock.render();

        // Якщо проєкт нещодавній, використовуємо декоратор
        if (project.isRecent) {
          const decorator = new HighlightDecorator(projectBlock);
          projectElement = decorator.render();
        }

        expDiv.appendChild(projectElement);
      }

      container.appendChild(expDiv);
    }

    return container;
  }
}