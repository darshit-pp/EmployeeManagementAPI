namespace EmployeeManagementAPI.Common.Helper
{
    public class DbParameter
    {
        public Dapper.DynamicParameters Parameters { get; set; }

        public DbParameter()
        {
            Parameters = new Dapper.DynamicParameters();
        }
    }
}