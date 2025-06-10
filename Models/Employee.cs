using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementAPI.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int DepartmentId { get; set; }
        public string Role { get; set; } = null!;
        public decimal Salary { get; set; }
        public bool Status { get; set; }
        public DateTime JoiningDate { get; set; }

        public virtual Department Department { get; set; } = null!;
    }
}