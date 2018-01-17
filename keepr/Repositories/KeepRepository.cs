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
        //GET ALL KEEPS
        public IEnumerable<Keep> GetAll()
        {
            return _db.Query<Keep>("SELECT * FROM keeps WHERE public = true");
        }
        //GET ALL KEEPS BY USER ID
        public IEnumerable<Keep> GetAllByUserId(int id)
        {
            return _db.Query<Keep>($"SELECT * FROM keeps WHERE userid = {id}");
        }
        // GET KEEP BY ID
        public Keep GetById(int id)
        {
            Console.WriteLine("THIS IS THE GET REQUEST ID: ", id);
            return _db.QueryFirstOrDefault<Keep>($"SELECT * FROM keeps WHERE id = {id}", id);
        }
        // GET KEEPS BY SEARCH QUERY
        internal IEnumerable<Keep> GetAllBySearch(string v)
        {
            var words = v.Split(' ');
            var output = $"SELECT * FROM keeps WHERE public = true AND name LIKE ";
            if (words.Length > 1)
            {
                for (var i = 0; i < words.Length; i++)
                {
                    var word = words[i];
                    if (i == words.Length - 1)
                    {
                        output += $"'%{word}%'";
                    }
                    else
                    {
                        output += $"'%{word}%' OR name LIKE ";
                    }
                }
            }
            else
            {
                output += $"'%{v}%'";
            }
            return _db.Query<Keep>(output);
        }
        //CREATE NEW KEEP
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
        //EDIT/UPDATE KEEP
        public Keep GetOneByIdAndUpdate(int id, Keep keep)
        {
            return _db.QueryFirstOrDefault<Keep>($@"
                UPDATE keeps 
                SET Name = @Name, 
                    ImageUrl = @ImageUrl, 
                    UserId = @UserId, 
                    KeepCount = @KeepCount, 
                    Viewed = @Viewed, 
                    Public = @Public
                WHERE id = {id};
                SELECT * FROM keeps WHERE id = {id};", keep);
        }
        //DELETE KEEP
        public string FindByIdAndRemove(int id)
        {
            var success = _db.Execute($@"
                DELETE FROM keeps WHERE Id = {id}
            ", id);
            return success > 0 ? "success" : "umm that didnt work";
        }
    }
}
