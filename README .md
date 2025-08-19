# Генератор Резюме - Реалізація Патернів Проектування

Цей проект демонструє реалізацію 5 патернів проектування у застосунку для
генерації резюме, створеному з TypeScript та Vite.

## Реалізація Патернів Проектування

### 1. Патерн Facade (Фасад)

**Файл:** `src/facade/ResumePage.ts`

Клас `ResumePage` надає простий інтерфейс до складної системи генерації резюме:

- Метод `init(jsonPath)` приховує складність завантаження даних, валідації,
  трансформації та рендерингу
- Діє як єдина точка входу для всього застосунку
- Координує між завантаженням даних та імпортером

### 2. Патерн Template Method (Шаблонний метод)

**Файли:** `src/importer/AbstractImporter.ts`, `src/importer/ResumeImporter.ts`

Визначає скелет алгоритму імпорту:

- `AbstractImporter` визначає шаблон з методом `import()`, який викликає
  `validate()`, `map()` та `render()`
- `ResumeImporter` реалізує конкретні кроки:
  - `validate()`: Перевіряє структуру JSON та обов'язкові поля
  - `map()`: Трансформує сирі дані у внутрішню модель
  - `render()`: Створює та відображає DOM-елементи

### 3. Патерн Factory Method (Фабричний метод)

**Файл:** `src/blocks/BlockFactory.ts`

Інкапсулює створення різних типів блоків резюме:

- Метод `createBlock(type, model)` створює відповідні екземпляри блоків
- Підтримує: header, summary, experience, education, skills
- Повертає об'єкти, що реалізують інтерфейс `IBlock`

### 4. Патерн Composite (Компонувальник)

**Файли:** `src/blocks/ExperienceBlock.ts`, `src/blocks/ProjectBlock.ts`

Обробляє ієрархічну структуру досвіду та проектів:

- `ExperienceBlock` діє як композитний контейнер, що містить множину елементів
  `ProjectBlock`
- `ProjectBlock` є листовим компонентом без дочірніх елементів
- Забезпечує рекурсивний рендеринг секцій досвіду з їх проектами

### 5. Патерн Decorator (Декоратор)

**Файл:** `src/decorators/HighlightDecorator.ts`

Динамічно додає візуальне виділення до елементів резюме:

- Обгортає об'єкти `IBlock` для додавання функціональності виділення
- Додає CSS-клас `highlight` до проектів з `isRecent: true`
- Не змінює внутрішню структуру обгорнутих об'єктів

## Запуск

### Розробка

```bash
npm install
npm run dev
```

### Продакшн збірка

```bash
npm run build
npm run preview
```

## Структура Проекту

```
src/
├── facade/ResumePage.ts          # Патерн Facade
├── importer/
│   ├── AbstractImporter.ts       # Базовий Template Method
│   └── ResumeImporter.ts         # Реалізація Template Method
├── blocks/
│   ├── BlockFactory.ts           # Factory Method
│   ├── HeaderBlock.ts
│   ├── SummaryBlock.ts
│   ├── ExperienceBlock.ts        # Composite контейнер
│   ├── ProjectBlock.ts           # Composite листок
│   ├── EducationBlock.ts
│   └── SkillsBlock.ts
├── decorators/
│   └── HighlightDecorator.ts     # Патерн Decorator
├── models/
│   └── ResumeModel.ts            # TypeScript типи
└── main.ts                       # Точка входу
```

## Додавання Нових Блоків Резюме

Щоб додати новий тип блоку (наприклад, "Сертифікати"):

1. **Створіть клас блоку:**

```typescript
// src/blocks/CertificatesBlock.ts
import {IBlock} from './BlockFactory';

export class CertificatesBlock implements IBlock {
  constructor(private data: Certificate[]) {}

  render(): HTMLElement {
    // Реалізація тут
  }
}
```

2. **Оновіть фабрику:**

```typescript
// У BlockFactory.ts
export type BlockType =
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certificates';

// У методі createBlock:
if (type === 'certificates') {
  return new CertificatesBlock(model.certificates);
}
```

3. **Оновіть модель:**

```typescript
// У ResumeModel.ts
export interface ResumeModel {
  // ... існуючі поля
  certificates: Certificate[];
}
```

4. **Оновіть імпортер:**

```typescript
// У методі render ResumeImporter.ts:
const certificatesBlock = factory.createBlock('certificates', model);
root.appendChild(certificatesBlock.render());
```

## Формат Даних

Застосунок очікує файл `resume.json` у корені проекту з наступною структурою:

```json
{
  "header": {
    "fullName": "Повне Ім'я",
    "title": "Посада",
    "contacts": {
      "email": "email@example.com",
      "phone": "+123456789",
      "location": "Місто, Країна"
    }
  },
  "summary": {
    "text": "Короткий опис професійного досвіду"
  },
  "experience": [
    {
      "position": "Назва Посади",
      "company": "Назва Компанії",
      "start": "2022-01",
      "end": "Теперішній час",
      "projects": [
        {
          "name": "Назва Проекту",
          "description": "Опис проекту",
          "isRecent": true
        }
      ]
    }
  ],
  "education": [
    {
      "degree": "Ступінь",
      "field": "Галузь навчання",
      "institution": "Назва університету",
      "graduation": "2020"
    }
  ],
  "skills": {
    "core": ["JavaScript", "TypeScript", "React"],
    "tools": ["Git", "Docker", "AWS"],
    "languages": ["Українська", "Англійська"]
  }
}
```
