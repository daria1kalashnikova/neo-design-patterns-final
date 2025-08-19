/**
 * Блок відображення освіти в резюме
 */

import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private data: Education[]) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section education";
    section.innerHTML = "<h2>Education</h2>";

    for (const edu of this.data) {
      const eduDiv = document.createElement("div");
      eduDiv.className = "education-item";
      eduDiv.innerHTML = `
        ${edu.degree} ${edu.field}, ${edu.institution} (${edu.graduation})
      `;
      section.appendChild(eduDiv);
    }

    return section;
  }
}
