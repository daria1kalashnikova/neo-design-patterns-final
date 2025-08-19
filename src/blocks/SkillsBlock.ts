/**
 * Блок відображення навичок резюме
 */

import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private data: Skills) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section skills";
    section.innerHTML = "<h2>Skills</h2>";

    // Створюємо список навичок, згрупований за категоріями
    const skillsUL = document.createElement("ul");
    skillsUL.className = "skills-list";

    const categories = Object.entries(this.data);

    for (const [categoryName, skillsArray] of categories) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${categoryName}:</strong> ${skillsArray.join(
        ", "
      )}`;
      skillsUL.appendChild(listItem);
    }

    section.appendChild(skillsUL);
    return section;
  }
}