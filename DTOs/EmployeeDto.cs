namespace EmployeeManagementAPI.DTOs
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public bool Status { get; set; }
        public DateTime JoiningDate { get; set; }
    }

    public class CreateEmployeeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public string Role { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public bool Status { get; set; } = true;
        public DateTime JoiningDate { get; set; }
    }

    public class UpdateEmployeeDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public string Role { get; set; } = string.Empty;
        public decimal Salary { get; set; }
        public bool Status { get; set; }
        public DateTime JoiningDate { get; set; }
    }
}