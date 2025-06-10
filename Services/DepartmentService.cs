using Microsoft.EntityFrameworkCore;
using EmployeeManagementAPI.Data;
using EmployeeManagementAPI.Models;
using EmployeeManagementAPI.DTOs;

namespace EmployeeManagementAPI.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly EmployeeManagementContext _context;

        public DepartmentService(EmployeeManagementContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DepartmentDto>> GetAllDepartmentsAsync()
        {
            return await _context.Departments
                .Select(d => new DepartmentDto
                {
                    DepartmentId = d.DepartmentId,
                    Name = d.Name,
                    EmployeeCount = d.Employees.Count
                })
                .ToListAsync();
        }

        public async Task<DepartmentDto?> GetDepartmentByIdAsync(int id)
        {
            var department = await _context.Departments
                .Include(d => d.Employees)
                .FirstOrDefaultAsync(d => d.DepartmentId == id);

            if (department == null) return null;

            return new DepartmentDto
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                EmployeeCount = department.Employees.Count
            };
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(CreateDepartmentDto createDepartmentDto)
        {
            var department = new Department
            {
                Name = createDepartmentDto.Name
            };

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return new DepartmentDto
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                EmployeeCount = 0
            };
        }

        public async Task<DepartmentDto?> UpdateDepartmentAsync(int id, UpdateDepartmentDto updateDepartmentDto)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null) return null;

            department.Name = updateDepartmentDto.Name;
            await _context.SaveChangesAsync();

            return await GetDepartmentByIdAsync(id);
        }

        public async Task<bool> DeleteDepartmentAsync(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null) return false;

            // Check if department has employees
            var hasEmployees = await _context.Employees.AnyAsync(e => e.DepartmentId == id);
            if (hasEmployees) return false; // Cannot delete department with employees

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}