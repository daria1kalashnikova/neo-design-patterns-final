/**
 * Конкретна реалізація імпортера резюме
 * Наслідується від AbstractImporter і реалізує абстрактні методи
 */

import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  /**
   * Перевіряє, чи відповідає JSON-об'єкт очікуваній структурі
   */
  protected validate(): void {
    const data = this.raw as any;

    // Перевіряємо наявність обов'язкових полів
    if (!data.header) {
      throw new Error("Missing header");
    }
    if (!data.summary) {
      throw new Error("Missing summary");
    }
    if (!data.experience) {
      throw new Error("Missing experience");
    }
    if (!data.education) {
      throw new Error("Missing education");
    }
    if (!data.skills) {
      throw new Error("Missing skills");
    }
  }

  /**
   * Перетворює JSON-дані у внутрішню модель резюме
   */
  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  /**
   * Рендерить модель резюме у DOM
   */
  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content")!;

    // Створюємо фабрику і використовуємо її для створення і рендерингу блоків
    const factory = new BlockFactory();

    // Створюємо і додаємо у DOM кожен блок резюме
    const headerBlock = factory.createBlock("header", model);
    root.appendChild(headerBlock.render());

    const summaryBlock = factory.createBlock("summary", model);
    root.appendChild(summaryBlock.render());

    const experienceBlock = factory.createBlock("experience", model);
    root.appendChild(experienceBlock.render());

    const educationBlock = factory.createBlock("education", model);
    root.appendChild(educationBlock.render());

    const skillsBlock = factory.createBlock("skills", model);
    root.appendChild(skillsBlock.render());
  }
}
