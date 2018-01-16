using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using keepr.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace keepr.Repositories
{
    public class VaultRepository
    {
        private readonly IDbConnection _db;

        public VaultRepository(IDbConnection db)
        {
            _db = db;
        }
        
        // Find One Find Many add update delete
        public IEnumerable<Vault> GetAllByUserId(int id)
        {
            return _db.Query<Vault>($"SELECT * FROM vaults WHERE userId = {id}");
        }

        public Vault GetById(int id)
        {
            Console.WriteLine("THIS IS THE GET REQUEST ID: ", id);
            return _db.QueryFirstOrDefault<Vault>($"SELECT * FROM vaults WHERE id = {id}", id);
        }

        public Vault Add(Vault vault)
        {

            int id = _db.ExecuteScalar<int>("INSERT INTO vaults (Name, Description, UserId)"
                        + " VALUES(@Name, @Description, @UserId); SELECT LAST_INSERT_ID()", new
                        {
                            vault.Name, 
                            vault.Description,
                            vault.UserId,
                        });
            vault.Id = id;
            return vault;

        }

        public Vault GetOneByIdAndUpdate(int id, Vault vault)
        {
            return _db.QueryFirstOrDefault<Vault>($@"
                UPDATE vaults SET  
                    Name = @Name, 
                    Description = @Description, 
                    UserId = @UserId
                WHERE id = {id};
                SELECT * FROM vaults WHERE id = {id};", vault);
        }

        public string FindByIdAndRemove(int id)
        {
            var success = _db.Execute($@"
                DELETE FROM vaults WHERE Id = {id}
            ", id);
            return success > 0 ? "success" : "umm that didnt work";
        }
    }
}