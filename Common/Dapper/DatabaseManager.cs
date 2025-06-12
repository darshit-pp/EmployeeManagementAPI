using System.Data;
using Microsoft.Data.SqlClient;
using static Dapper.SqlMapper;
using EmployeeManagementAPI.Common.Enums;

namespace EmployeeManagementAPI.Common.Helper
{
    public interface IDatabaseManager
    {
        T ExecuteScalar<T>(string commandText);
        List<T> GetList<T>(string commandText, CmdType commandType, Dapper.DynamicParameters? parameters = null);
        List<T> GetList<T>(string commandText, CmdType commandType, out int recordCount, Dapper.DynamicParameters? parameters = null);
        IEnumerable<T> ExecuteSp<T>(string spName);
        IEnumerable<T> ExecuteSp<T>(string spName, Dapper.DynamicParameters? parameters);
        GridReader ExecuteSpMultiple(string spName, Dapper.DynamicParameters? parameters);
        GridReader ExecuteSpMultiple(string spName);
        void ExecuteSql(string commandText, Dapper.DynamicParameters? parameters = null);
    }

    public class DatabaseManager : IDatabaseManager, IDisposable
    {
        private string ConnectionString = "";
        private SqlConnection? connection = null;
        int timeOut = 1000;

        public DatabaseManager(string connectionString)
        {
            this.ConnectionString = connectionString;
            Connect();
        }

        public T ExecuteScalar<T>(string commandText)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.ExecuteScalar<T>(commandText, commandType: CommandType.Text, commandTimeout: timeOut);
            return result;
        }

        public void ExecuteSql(string commandText, Dapper.DynamicParameters? parameters = null)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.Execute(commandText, param: parameters, commandType: CommandType.Text, commandTimeout: timeOut);
        }

        public List<T> GetList<T>(string commandText, CmdType commandType, Dapper.DynamicParameters? parameters = null)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.Query<T>(commandText, parameters,
                commandType: commandType == CmdType.StoredProcedure ? CommandType.StoredProcedure : CommandType.Text,
                commandTimeout: timeOut).AsList<T>();
            return result;
        }

        public List<T> GetList<T>(string commandText, CmdType commandType, out int recordCount, Dapper.DynamicParameters? parameters = null)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            recordCount = 0;
            if (parameters == null)
                parameters = new Dapper.DynamicParameters();

            parameters.Add("@RecordCount", recordCount, direction: System.Data.ParameterDirection.Output);
            var result = connection.Query<T>(commandText, parameters,
                commandType: commandType == CmdType.StoredProcedure ? CommandType.StoredProcedure : CommandType.Text).AsList<T>();
            recordCount = parameters.Get<int>("@RecordCount");
            return result;
        }

        public IEnumerable<T> ExecuteSp<T>(string spName)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.Query<T>(spName, commandType: CommandType.StoredProcedure, commandTimeout: timeOut);
            return result;
        }

        public IEnumerable<T> ExecuteSp<T>(string spName, Dapper.DynamicParameters? parameters)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.Query<T>(spName, parameters, commandType: CommandType.StoredProcedure, commandTimeout: timeOut);
            return result;
        }

        public GridReader ExecuteSpMultiple(string spName, Dapper.DynamicParameters? parameters)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.QueryMultiple(spName, parameters, commandType: CommandType.StoredProcedure, commandTimeout: timeOut);
            return result;
        }

        public GridReader ExecuteSpMultiple(string spName)
        {
            if (connection == null)
                throw new InvalidOperationException("Database connection is not initialized.");

            var result = connection.QueryMultiple(spName, commandType: CommandType.StoredProcedure, commandTimeout: timeOut);
            return result;
        }

        private void Connect()
        {
            connection = new SqlConnection(this.ConnectionString);
        }

        public void Dispose()
        {
            connection?.Dispose();
        }
    }
}