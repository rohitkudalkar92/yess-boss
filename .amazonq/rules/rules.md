# YessBoss — AI Code Consistency Rules

## Project Stack
- Angular 21 (standalone components, no NgModules)
- Tailwind CSS for all styling — no custom CSS files
- TypeScript strict mode

---

## File & Folder Structure
- Pages live in `src/app/pages/<page-name>/<page-name>.ts` + `.html`
- Shared components live in `src/app/components/<component-name>/`
- Enums live in `src/app/enums/<name>.enum.ts`
- Constants live in `src/app/constants/<name>.ts`
- Services live in `src/app/services/<name>.service.ts`
- Each component has exactly two files: `<name>.ts` and `<name>.html`
- No `.css` or `.scss` files — Tailwind only

---

## Components
- Always standalone: `imports: [...]` directly in `@Component`
- Selector prefix: `app-*` (e.g. `app-button`, `app-input`)
- Class name matches file name in PascalCase (e.g. `AppButton`, `LoginModal`)
- No `OnInit`, `OnDestroy` unless strictly necessary
- Prefer `inject()` over constructor injection for services
- Expose enums to templates via `readonly EnumName = EnumName` on the class

---

## Reusable Components — Always Use These
- **Button** → `<app-button>` — never use raw `<button>` for action buttons
  - Use `ButtonVariant`, `ButtonSize`, `ButtonWidth`, `ButtonType` enums
  - Pass `[icon]` using `IconName` enum for icons inside buttons
- **Input** → `<app-input>` — never use raw `<input>` for form fields
  - Use `InputType` enum for the `type` input
  - Always set `name` attribute when inside `ngForm`
- **Icon** → `<app-icon>` — never inline raw `<svg>` for named icons
  - Always use `IconName` enum for the `name` input

---

## Enums
- Every set of fixed string/number values must be an enum
- Enums go in `src/app/enums/<name>.enum.ts`
- Existing enums to reuse:
  - `IconName` — all icon identifiers
  - `InputType` — text, password, email, number, tel
  - `ButtonVariant`, `ButtonSize`, `ButtonWidth`, `ButtonType`
  - `Garment` — all garment types

---

## Icons
- All SVG paths live in `src/app/constants/icons.ts` as the `ICONS` constant
- All icon keys are mirrored in `src/app/enums/icon-name.enum.ts` as `IconName`
- To add a new icon: add the SVG path to `ICONS` AND add the key to `IconName`

---

## Styling
- Use Tailwind utility classes only
- Color palette:
  - Primary action: `emerald-600` / hover `emerald-500`
  - Danger: `red-500` / hover `red-600`
  - Backgrounds: `slate-50`, `slate-100`
  - Text: `slate-900` (headings), `slate-700` (labels), `slate-400` (hints)
  - Borders: `slate-200`
- Border radius: `rounded-xl` for inputs/buttons, `rounded-2xl` for modals/cards
- Focus ring: `focus:ring-2 focus:ring-emerald-500`
- Disabled state: `disabled:opacity-50 disabled:cursor-not-allowed`

---

## Forms
- Use Angular template-driven forms (`FormsModule`, `ngModel`)
- Always wrap fields in `<form #formRef="ngForm">` to track validity
- Disable submit buttons with `[disabled]="formRef.invalid"`
- Always add `name` attribute to every `<app-input>` inside a form

---

## Boolean Inputs
- Use `@Input({ transform: booleanAttribute })` for boolean inputs
- This allows shorthand usage: `<app-input required />` instead of `[required]="true"`

---

## Code Style
- No comments unless the logic is genuinely non-obvious
- Keep templates clean — no business logic in HTML
- Keep `.ts` files free of DOM/style concerns
- Minimal code — no boilerplate, no unused imports
- Single responsibility per component
