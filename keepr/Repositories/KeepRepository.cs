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
    public class KeepRepository
    {
        private readonly IDbConnection _db;

        public KeepRepository(IDbConnection db)
        {
            _db = db;
        }
        public IEnumerable<Keep> GetAll()
        {
            return _db.Query<Keep>("SELECT * FROM keeps WHERE public = true");
        }
        
        public IEnumerable<Keep> GetAllByUserId(int id)
        {
            return _db.Query<Keep>($"SELECT * FROM keeps WHERE userid = {id}");
        }

        public Keep GetById(int id)
        {
            Console.WriteLine("THIS IS THE GET REQUEST ID: ", id);
            return _db.QueryFirstOrDefault<Keep>($"SELECT * FROM keeps WHERE id = {id}", id);
        }

        public Keep Add(Keep keep)
        {

            int id = _db.ExecuteScalar<int>("INSERT INTO keeps (Name, ImageUrl, UserId, KeepCount, Viewed, Public)"
                        + " VALUES(@Name, @ImageUrl, @UserId, @KeepCount, @Viewed, @Public); SELECT LAST_INSERT_ID()", new
                        {
                            keep.Name, 
                            keep.ImageUrl,
                            keep.UserId,
                            keep.KeepCount,
                            keep.Viewed,
                            keep.Public
                        });
            keep.Id = id;
            return keep;

        }

        public Keep GetOneByIdAndUpdate(int id, Keep keep)
        {
            return _db.QueryFirstOrDefault<Keep>($@"
                UPDATE keeps 
                SET Name = @Name, 
                    ImageUrl = @ImageUrl, 
                    UserId = @UserId, 
                    KeepCount = @KeepCount, 
                    Viewed = @Viewed 
                    Public = @Public
                WHERE id = {id};
                SELECT * FROM keeps WHERE id = {id};", keep);
        }

        public string FindByIdAndRemove(int id)
        {
            var success = _db.Execute($@"
                DELETE FROM keeps WHERE Id = {id}
            ", id);
            return success > 0 ? "success" : "umm that didnt work";
        }
    }
}
