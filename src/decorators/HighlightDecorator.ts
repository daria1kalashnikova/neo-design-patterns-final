/**
 * Патерн Decorator (Декоратор)
 *
 * Клас для додавання виділення до блоків резюме.
 * Декорує об'єкти типу IBlock, додаючи їм нову функціональність
 * без зміни їх внутрішньої структури.
 */

import { IBlock } from "../blocks/BlockFactory";

export class HighlightDecorator implements IBlock {
  private wrappedBlock: IBlock;

  constructor(block: IBlock) {
    this.wrappedBlock = block;
  }

  render(): HTMLElement {
    // Викликаємо render() на обгорнутому блоці
    const element = this.wrappedBlock.render();

    // Додаємо клас 'highlight' до елемента
    element.classList.add("highlight");

    // Повертаємо модифікований елемент
    return element;
  }
}
