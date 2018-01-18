using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [Route("api/[controller]")]
    public class KeepsController : Controller
    {
        private readonly KeepRepository db;
        private readonly UserRepository users;
        public KeepsController(KeepRepository keepRepo, UserRepository userRepo)
        {
            db = keepRepo;
            users = userRepo;  
        }
        // GET ALL KEEPS
        [HttpGet]
        public IEnumerable<Keep> GetAll()
        {
            return db.GetAll();
        }
        // GET BY USER ID
        [Authorize]
        [HttpGet("users/{id}")]
        public IEnumerable<Keep> GetByUserId()
        {   
            var user= HttpContext.User;
            var id = user.Identity.Name;
            UserReturnModel activeUser = null;
            if(id!=null){
                activeUser = users.GetUserById(id);
            }
            var uid = activeUser.Id;
            return db.GetAllByUserId(uid);
        }
        //GET BY SEARCH QUERY
        [HttpGet("search/{query}")]
        public IEnumerable<Keep> GetBySearch(string query)
        {
            return db.GetAllBySearch(query);
        }
        [HttpGet("categories/{query}")]
        public IEnumerable<Keep> GetByCategory(string query)
        {
            return db.GetAllByCategory(query);
        }
        //GET BY KEEP ID
        [HttpGet("{id}")]
        public Keep Get(int id)
        {
            Console.WriteLine(id);
            return db.GetById(id);
        }

        // POST CREATE NEW KEEP
        [Authorize]
        [HttpPost]
        public Keep Post([FromBody]Keep keep)
        {
            var user= HttpContext.User;
            var id = user.Identity.Name;
            UserReturnModel activeUser = null;
            if(id != null)
            {
                activeUser = users.GetUserById(id);
            }
            var uid = activeUser.Id;
            keep.UserId = uid;
            return db.Add(keep);
        }
        // PUT EDIT KEEP
        [Authorize]
        [HttpPut("{id}")]
        public Keep Put(int id, [FromBody]Keep keep)
        {
            if (ModelState.IsValid)
            {
                return db.GetOneByIdAndUpdate(id, keep);
            }
            return null;
        }
        // DELETE DELETE KEEP
        [Authorize]
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return db.FindByIdAndRemove(id);
        }
    }
}
