namespace EmployeeManagementAPI.DTOs
{
    public class DepartmentDto
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int EmployeeCount { get; set; }
    }

    public class CreateDepartmentDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class UpdateDepartmentDto
    {
        public string Name { get; set; } = string.Empty;
    }
}