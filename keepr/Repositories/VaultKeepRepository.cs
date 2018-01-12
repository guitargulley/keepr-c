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
    public class VaultKeepRepository
    {
        private readonly IDbConnection _db;

        public VaultKeepRepository(IDbConnection db)
        {
            _db = db;
        }

        // Find One Find Many add update delete
        public IEnumerable<VaultKeep> GetAll()
        {
            return _db.Query<VaultKeep>("SELECT * FROM vaultkeeps");
        }

        public VaultKeep GetById(int id)
        {
            Console.WriteLine("THIS IS THE GET REQUEST ID: ", id);
            return _db.QueryFirstOrDefault<VaultKeep>($"SELECT * FROM vaultkeeps WHERE id = {id}", id);
        }

        public String Add(VaultKeep vaultkeep)
        {

            var success = _db.ExecuteScalar<int>("INSERT INTO vaultkeeps (UserId, VaultId, KeepID)"
                        + " VALUES(@UserId, @VaultId, @KeepID); SELECT LAST_INSERT_ID()", new
                        {
                            vaultkeep.UserId, 
                            vaultkeep.VaultId,
                            vaultkeep.KeepId,
                        });
            
            return success > 0 ? "success" : "umm that didnt work";

        }

        public VaultKeep GetOneByIdAndUpdate(int id, VaultKeep vaultkeep)
        {
            return _db.QueryFirstOrDefault<VaultKeep>($@"
                UPDATE vaultkeeps SET  
                    UserID = @UserID, 
                    VaultId = @VaultId, 
                    KeepId = @KeepId, 
                WHERE Id = {id};
                SELECT * FROM vaultkeeps WHERE id = {id};", vaultkeep);
        }

        public string FindByIdAndRemove(int id)
        {
            var success = _db.Execute($@"
                DELETE FROM vaultkeep WHERE Id = {id}
            ", id);
            return success > 0 ? "success" : "umm that didnt work";
        }
    }
}