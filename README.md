# 👥 Employee Management API

<div align="center">
  
  ![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-8.0-blue?style=for-the-badge&logo=dotnet)
  ![SQL Server](https://img.shields.io/badge/SQL%20Server-Database-red?style=for-the-badge&logo=microsoftsqlserver)
  ![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green?style=for-the-badge&logo=swagger)
  ![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
  
  **A powerful and modern REST API for managing employees and departments built with ASP.NET Core**
  
  [🚀 Live Demo](https://your-api-domain.com) • [📖 API Documentation](https://your-api-domain.com/swagger) • [🐛 Report Bug](https://github.com/darshit-pp/employee-management-api/issues) • [✨ Request Feature](https://github.com/yourdarshit-pp/employee-management-api/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📡 API Endpoints](#-api-endpoints)
- [💾 Database Schema](#-database-schema)
- [🌐 Deployment](#-deployment)
- [📸 Screenshots](#-screenshots)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<table>
<tr>
<td>

🔧 **Core Features**
- ✅ Complete CRUD operations for Employees
- ✅ Department management with relationships
- ✅ RESTful API design principles
- ✅ Interactive Swagger UI documentation
- ✅ Entity Framework Core with Database First
- ✅ SQL Server database integration

</td>
<td>

🛡️ **Technical Features**
- ✅ Clean Architecture pattern
- ✅ Dependency Injection
- ✅ Data Transfer Objects (DTOs)
- ✅ Error handling and validation
- ✅ CORS enabled for global access
- ✅ Production-ready deployment

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

<div align="center">

| Category | Technology |
|----------|------------|
| **Backend Framework** | ASP.NET Core 8.0 |
| **Database** | SQL Server / LocalDB |
| **ORM** | Entity Framework Core |
| **API Documentation** | Swagger/OpenAPI |
| **Architecture** | Clean Architecture |
| **Deployment** | Render / Azure / Railway |

</div>

---

## 🚀 Quick Start

### Prerequisites

- ✅ .NET 8.0 SDK
- ✅ SQL Server / SQL Server Express / LocalDB
- ✅ Visual Studio 2022 or VS Code
- ✅ Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourdarshit-pp/employee-management-api.git
   cd employee-management-api
   ```

2. **Install dependencies**
   ```bash
   dotnet restore
   ```

3. **Setup Database**
   ```sql
   -- Run in SQL Server Management Studio
   CREATE DATABASE EmployeeManagementDB;
   -- Then run the schema script from /Database/schema.sql
   ```

4. **Update Connection String**
 
   -- appsettings.json
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=EmployeeManagementDB;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

6. **Run the application**
   ```bash
   dotnet run
   ```

7. **Open Swagger UI**
   ```
   https://localhost:7170
   ```

---

## 📡 API Endpoints

<details>
<summary><b>👥 Employee Endpoints</b></summary>

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/employees` | Get all employees | - |
| `GET` | `/api/employees/{id}` | Get employee by ID | - |
| `POST` | `/api/employees` | Create new employee | [CreateEmployeeDto](#employee-dto) |
| `PUT` | `/api/employees/{id}` | Update employee | [UpdateEmployeeDto](#employee-dto) |
| `DELETE` | `/api/employees/{id}` | Delete employee | - |

</details>

<details>
<summary><b>🏢 Department Endpoints</b></summary>

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/departments` | Get all departments | - |
| `GET` | `/api/departments/{id}` | Get department by ID | - |
| `POST` | `/api/departments` | Create new department | [CreateDepartmentDto](#department-dto) |
| `PUT` | `/api/departments/{id}` | Update department | [UpdateDepartmentDto](#department-dto) |
| `DELETE` | `/api/departments/{id}` | Delete department | - |

</details>

### Sample API Calls

<details>
<summary><b>📝 Create Employee</b></summary>

```bash
curl -X POST "https://your-api-domain.com/api/employees" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@company.com",
    "departmentId": 1,
    "role": "Software Developer",
    "salary": 75000.00,
    "status": true,
    "joiningDate": "2024-01-15T00:00:00"
  }'
```

</details>

<details>
<summary><b>🏢 Create Department</b></summary>

```bash
curl -X POST "https://your-api-domain.com/api/departments" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Information Technology"
  }'
```

</details>

---

## 💾 Database Schema

<div align="center">

```mermaid
erDiagram
    DEPARTMENT ||--o{ EMPLOYEE : has
    
    DEPARTMENT {
        int DepartmentId PK
        nvarchar Name
    }
    
    EMPLOYEE {
        int EmployeeId PK
        nvarchar Name
        nvarchar Email UK
        int DepartmentId FK
        nvarchar Role
        decimal Salary
        bit Status
        datetime JoiningDate
    }
```

</div>

### Table Details

<details>
<summary><b>🏢 Department Table</b></summary>

| Column | Type | Constraints |
|--------|------|-------------|
| DepartmentId | INT | PRIMARY KEY, IDENTITY |
| Name | NVARCHAR(100) | NOT NULL |

</details>

<details>
<summary><b>👤 Employee Table</b></summary>

| Column | Type | Constraints |
|--------|------|-------------|
| EmployeeId | INT | PRIMARY KEY, IDENTITY |
| Name | NVARCHAR(100) | NOT NULL |
| Email | NVARCHAR(100) | NOT NULL, UNIQUE |
| DepartmentId | INT | FOREIGN KEY |
| Role | NVARCHAR(50) | NOT NULL |
| Salary | DECIMAL(18,2) | NOT NULL |
| Status | BIT | DEFAULT 1 |
| JoiningDate | DATETIME | NOT NULL |

</details>

---

## 🌐 Deployment

### 🚀 Live Demo

The API is deployed and accessible at:

- **🌍 Live API**: [https://your-api-domain.com](https://your-api-domain.com)
- **📖 Interactive Docs**: [https://your-api-domain.com/swagger](https://your-api-domain.com/swagger)
- **❤️ Health Check**: [https://your-api-domain.com/health](https://your-api-domain.com/health)

### Deploy Your Own

<details>
<summary><b>🔥 Deploy to Render (Free)</b></summary>

1. Fork this repository
2. Sign up at [Render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Add environment variables:
   - `DATABASE_URL`: Your connection string
6. Deploy automatically!

</details>

<details>
<summary><b>☁️ Deploy to Azure</b></summary>

```bash
# Azure CLI deployment
az group create --name EmployeeAPI --location "East US"
az appservice plan create --name EmployeeAPIPlan --resource-group EmployeeAPI --sku FREE
az webapp create --resource-group EmployeeAPI --plan EmployeeAPIPlan --name your-unique-name --runtime "DOTNET|8.0"
```

</details>

---

## 📸 Screenshots

<div align="center">

### 🎯 Swagger UI - Interactive API Documentation
![Swagger UI](https://via.placeholder.com/800x400/2196F3/ffffff?text=Swagger+UI+Screenshot)

### 📊 API Response - Employee List
![API Response](https://via.placeholder.com/800x300/4CAF50/ffffff?text=JSON+Response+Screenshot)

### 🗄️ Database Schema Visualization
![Database Schema](https://via.placeholder.com/600x400/FF9800/ffffff?text=Database+Schema+Diagram)

</div>

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
dotnet test

# API tests with specific endpoint
curl -X GET "https://localhost:7170/api/employees" -H "accept: application/json"
```

### Test Data
The API comes with sample data:
- 4 Departments (IT, HR, Finance, Marketing)
- 4 Sample Employees across different departments

---

## 📁 Project Structure

```
EmployeeManagementAPI/
├── 📁 Controllers/          # API Controllers
│   ├── EmployeesController.cs
│   └── DepartmentsController.cs
├── 📁 Data/                 # Database Context
│   └── EmployeeManagementContext.cs
├── 📁 Models/               # Entity Models
│   ├── Employee.cs
│   └── Department.cs
├── 📁 Services/             # Business Logic
│   ├── IEmployeeService.cs
│   ├── EmployeeService.cs
│   ├── IDepartmentService.cs
│   └── DepartmentService.cs
├── 📁 DTOs/                 # Data Transfer Objects
│   ├── EmployeeDto.cs
│   └── DepartmentDto.cs
├── 📄 Program.cs            # Application Entry Point
├── 📄 appsettings.json      # Configuration
└── 📄 README.md             # This file
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

<details>
<summary><b>🛠️ Development Setup</b></summary>

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

</details>

### 🐛 Found a Bug?

1. Check if it's already reported in [Issues](https://github.com/darshit-pp/employee-management-api/issues)
2. If not, create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

### 💡 Feature Requests

We're always looking to improve! Open an issue with:
- Clear description of the feature
- Use case explanation
- Any relevant examples

---

## 📈 Roadmap

- [ ] 🔐 JWT Authentication & Authorization
- [ ] 📊 Dashboard Analytics APIs
- [ ] 📧 Email Notifications
- [ ] 📱 Mobile App Support
- [ ] 🔍 Advanced Search & Filtering
- [ ] 📄 PDF Report Generation
- [ ] 🔄 API Versioning
- [ ] 📝 Audit Logging

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---
