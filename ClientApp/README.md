# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
employee-management-frontend
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ common
│  │  ├─ ConfirmDialog.jsx
│  │  ├─ ErrorMessage.jsx
│  │  ├─ LoadingSpinner.jsx
│  │  └─ SearchInput.jsx
│  ├─ components
│  │  └─ ui
│  │     ├─ alert-dialog.jsx
│  │     ├─ badge.jsx
│  │     ├─ button.jsx
│  │     ├─ card.jsx
│  │     ├─ dialog.jsx
│  │     ├─ dropdown-menu.jsx
│  │     ├─ form.jsx
│  │     ├─ input.jsx
│  │     ├─ label.jsx
│  │     ├─ navigation-menu.jsx
│  │     ├─ select.jsx
│  │     ├─ separator.jsx
│  │     ├─ sheet.jsx
│  │     ├─ skeleton.jsx
│  │     ├─ table.jsx
│  │     └─ textarea.jsx
│  ├─ dashboard
│  │  ├─ Dashboard.jsx
│  │  ├─ QuickActions.jsx
│  │  └─ StatsCard.jsx
│  ├─ departments
│  │  ├─ DepartmentCard.jsx
│  │  ├─ DepartmentForm.jsx
│  │  ├─ DepartmentList.jsx
│  │  └─ DepartmentSelect.jsx
│  ├─ employees
│  │  ├─ EmployeeActions.jsx
│  │  ├─ EmployeeCard.jsx
│  │  ├─ EmployeeDetails.jsx
│  │  ├─ EmployeeForm.jsx
│  │  └─ EmployeeList.jsx
│  ├─ hooks
│  │  ├─ useDepartments.js
│  │  ├─ useEmployees.js
│  │  └─ useToast.js
│  ├─ index.css
│  ├─ layout
│  │  ├─ Header.jsx
│  │  ├─ Layout.jsx
│  │  ├─ Navigation.jsx
│  │  └─ Sidebar.jsx
│  ├─ lib
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Dashboard.jsx
│  │  ├─ Departments.jsx
│  │  ├─ Employees.jsx
│  │  └─ NotFound.jsx
│  ├─ services
│  │  └─ api
│  │     ├─ api-department.js
│  │     ├─ api-employee.js
│  │     ├─ api-services.js
│  │     ├─ index.js
│  │     └─ urls.js
│  └─ utils
│     ├─ constants.js
│     ├─ formatters.js
│     └─ validations.js
├─ tailwind.config.js
└─ vite.config.js

```