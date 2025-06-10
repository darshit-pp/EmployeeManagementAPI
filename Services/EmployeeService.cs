using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.DTOs;
using EmployeeManagementAPI.Services;

namespace EmployeeManagementAPI.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeManagementContext _context;

        public EmployeeService(EmployeeManagementContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync()
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department.Name,
                    Role = e.Role,
                    Salary = e.Salary,
                    Status = e.Status,
                    JoiningDate = e.JoiningDate
                })
                .ToListAsync();
        }

        public async Task<EmployeeDto?> GetEmployeeByIdAsync(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.Department)
                .FirstOrDefaultAsync(e => e.EmployeeId == id);

            if (employee == null) return null;

            return new EmployeeDto
            {
                EmployeeId = employee.EmployeeId,
                Name = employee.Name,
                Email = employee.Email,
                DepartmentId = employee.DepartmentId,
                DepartmentName = employee.Department.Name,
                Role = employee.Role,
                Salary = employee.Salary,
                Status = employee.Status,
                JoiningDate = employee.JoiningDate
            };
        }

        public async Task<EmployeeDto> CreateEmployeeAsync(CreateEmployeeDto createEmployeeDto)
        {
            var employee = new Employee
            {
                Name = createEmployeeDto.Name,
                Email = createEmployeeDto.Email,
                DepartmentId = createEmployeeDto.DepartmentId,
                Role = createEmployeeDto.Role,
                Salary = createEmployeeDto.Salary,
                Status = createEmployeeDto.Status,
                JoiningDate = createEmployeeDto.JoiningDate
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return await GetEmployeeByIdAsync(employee.EmployeeId) ?? throw new InvalidOperationException();
        }

        public async Task<EmployeeDto?> UpdateEmployeeAsync(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return null;

            employee.Name = updateEmployeeDto.Name;
            employee.Email = updateEmployeeDto.Email;
            employee.DepartmentId = updateEmployeeDto.DepartmentId;
            employee.Role = updateEmployeeDto.Role;
            employee.Salary = updateEmployeeDto.Salary;
            employee.Status = updateEmployeeDto.Status;
            employee.JoiningDate = updateEmployeeDto.JoiningDate;

            await _context.SaveChangesAsync();
            return await GetEmployeeByIdAsync(id);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}