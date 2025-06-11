using EmployeeManagementAPI.Common.Helper;
using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly string _connectionString;

        public DepartmentService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string not found");
        }

        public async Task<IEnumerable<DepartmentDto>> GetAllDepartmentsAsync()
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var departments = dbManager.ExecuteSp<Department>("sp_GetAllDepartments");

                return departments.Select(d => new DepartmentDto
                {
                    DepartmentId = d.DepartmentId,
                    Name = d.Name,
                    EmployeeCount = d.EmployeeCount
                });
            });
        }

        public async Task<DepartmentDto?> GetDepartmentByIdAsync(int id)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@DepartmentId", id);

                var department = dbManager.ExecuteSp<Department>("sp_GetDepartmentById", parameters).FirstOrDefault();

                if (department == null) return null;

                return new DepartmentDto
                {
                    DepartmentId = department.DepartmentId,
                    Name = department.Name,
                    EmployeeCount = department.EmployeeCount
                };
            });
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(CreateDepartmentDto createDepartmentDto)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@Name", createDepartmentDto.Name);

                var departmentId = dbManager.ExecuteSp<int>("sp_CreateDepartment", parameters).FirstOrDefault();

                return new DepartmentDto
                {
                    DepartmentId = departmentId,
                    Name = createDepartmentDto.Name,
                    EmployeeCount = 0
                };
            });
        }

        public async Task<DepartmentDto?> UpdateDepartmentAsync(int id, UpdateDepartmentDto updateDepartmentDto)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@DepartmentId", id);
                parameters.Add("@Name", updateDepartmentDto.Name);

                var rowsAffected = dbManager.ExecuteSp<int>("sp_UpdateDepartment", parameters).FirstOrDefault();

                if (rowsAffected == 0) return null;

                return GetDepartmentByIdAsync(id).Result;
            });
        }

        public async Task<bool> DeleteDepartmentAsync(int id)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@DepartmentId", id);

                var result = dbManager.ExecuteSp<dynamic>("sp_DeleteDepartment", parameters).FirstOrDefault();

                return result?.CanDelete == 1;
            });
        }
    }
}