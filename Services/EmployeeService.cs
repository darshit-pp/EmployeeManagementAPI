using EmployeeManagementAPI.Common.Helper;
using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Models;

namespace EmployeeManagementAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly string _connectionString;

        public EmployeeService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string not found");
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync()
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var employees = dbManager.ExecuteSp<Employee>("sp_GetAllEmployees");

                return employees.Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.DepartmentName,
                    Role = e.Role,
                    Salary = e.Salary,
                    Status = e.Status,
                    JoiningDate = e.JoiningDate
                });
            });
        }

        public async Task<EmployeeDto?> GetEmployeeByIdAsync(int id)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@EmployeeId", id);

                var employee = dbManager.ExecuteSp<Employee>("sp_GetEmployeeById", parameters).FirstOrDefault();

                if (employee == null) return null;

                return new EmployeeDto
                {
                    EmployeeId = employee.EmployeeId,
                    Name = employee.Name,
                    Email = employee.Email,
                    DepartmentId = employee.DepartmentId,
                    DepartmentName = employee.DepartmentName,
                    Role = employee.Role,
                    Salary = employee.Salary,
                    Status = employee.Status,
                    JoiningDate = employee.JoiningDate
                };
            });
        }

        public async Task<EmployeeDto> CreateEmployeeAsync(CreateEmployeeDto createEmployeeDto)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@Name", createEmployeeDto.Name);
                parameters.Add("@Email", createEmployeeDto.Email);
                parameters.Add("@DepartmentId", createEmployeeDto.DepartmentId);
                parameters.Add("@Role", createEmployeeDto.Role);
                parameters.Add("@Salary", createEmployeeDto.Salary);
                parameters.Add("@Status", createEmployeeDto.Status);
                parameters.Add("@JoiningDate", createEmployeeDto.JoiningDate);

                var employeeId = dbManager.ExecuteSp<int>("sp_CreateEmployee", parameters).FirstOrDefault();

                return GetEmployeeByIdAsync(employeeId).Result ?? throw new InvalidOperationException();
            });
        }

        public async Task<EmployeeDto?> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@EmployeeId", id);
                parameters.Add("@Name", updateEmployeeDto.Name);
                parameters.Add("@Email", updateEmployeeDto.Email);
                parameters.Add("@DepartmentId", updateEmployeeDto.DepartmentId);
                parameters.Add("@Role", updateEmployeeDto.Role);
                parameters.Add("@Salary", updateEmployeeDto.Salary);
                parameters.Add("@Status", updateEmployeeDto.Status);
                parameters.Add("@JoiningDate", updateEmployeeDto.JoiningDate);

                var rowsAffected = dbManager.ExecuteSp<int>("sp_UpdateEmployee", parameters).FirstOrDefault();

                if (rowsAffected == 0) return null;

                return GetEmployeeByIdAsync(id).Result;
            });
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            return await Task.Run(() =>
            {
                using var dbManager = new DatabaseManager(_connectionString);
                var parameters = new Dapper.DynamicParameters();
                parameters.Add("@EmployeeId", id);

                var rowsAffected = dbManager.ExecuteSp<int>("sp_DeleteEmployee", parameters).FirstOrDefault();

                return rowsAffected > 0;
            });
        }
    }
}