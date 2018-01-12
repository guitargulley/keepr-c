using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [Route("api/[controller]")]
    public class VaultKeepsController : Controller
    {
        private readonly VaultKeepRepository db;
        public VaultKeepsController(VaultKeepRepository vaultKeepRepo)
        {
            db = vaultKeepRepo;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<VaultKeep> Get()
        {
            return db.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public VaultKeep Get(int id)
        {
            Console.WriteLine(id);
            return db.GetById(id);
        }

        // POST api/values
        [HttpPost]
        public String Post([FromBody]VaultKeep vaultKeep)
        {
            return db.Add(vaultKeep);
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public VaultKeep Put(int id, [FromBody]VaultKeep vaultKeep)
        {
            if (ModelState.IsValid)
            {
                return db.GetOneByIdAndUpdate(id, vaultKeep);
            }
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public String Delete(int id)
        {
            return db.FindByIdAndRemove(id);
        }
    }
}