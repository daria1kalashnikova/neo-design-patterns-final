/**
 * Блок проєкту - є частиною патерну Composite
 * Це "листовий" компонент, який не має дочірніх елементів
 */

import { Project } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class ProjectBlock implements IBlock {
  constructor(private data: Project) {}

  render(): HTMLElement {
    const container = document.createElement("div");
    container.className = "project-item";

    // Заповнюємо текстом проєкту
    container.textContent = `• ${this.data.name} – ${this.data.description}`;

    return container;
  }
}