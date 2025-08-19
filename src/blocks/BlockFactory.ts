/**
 * Патерн Factory Method (Фабричний метод)
 *
 * Клас BlockFactory відповідає за створення різних типів блоків резюме
 * залежно від типу, переданого як параметр.
 */

import { ResumeModel } from "../models/ResumeModel";
import { HeaderBlock } from "./HeaderBlock";
import { SummaryBlock } from "./SummaryBlock";
import { ExperienceBlock } from "./ExperienceBlock";
import { EducationBlock } from "./EducationBlock";
import { SkillsBlock } from "./SkillsBlock";

export interface IBlock {
  render(): HTMLElement;
}

export type BlockType =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills";

export class BlockFactory {
  createBlock(type: BlockType, model: ResumeModel): IBlock {
    if (type === "header") {
      return new HeaderBlock(model.header);
    }
    if (type === "summary") {
      return new SummaryBlock(model.summary);
    }
    if (type === "experience") {
      return new ExperienceBlock(model.experience);
    }
    if (type === "education") {
      return new EducationBlock(model.education);
    }
    if (type === "skills") {
      return new SkillsBlock(model.skills);
    }

    throw new Error(`Unknown block type: ${type}`);
  }
}