using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // Get List of user
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var userForList = _mapper.Map<IEnumerable<User>, IEnumerable<UserforList>>(users);
            return Ok(userForList);
        }

        // Get user by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userForReturn = _mapper.Map<User, UserforDetail>(user);
            return Ok(userForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserforUpdateDto user) {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(id);
           _mapper.Map<UserforUpdateDto, User>(user);
            if(await _repo.SaveAll()) {
                return NoContent();
            }
            throw new Exception($"Updating user {id} failed on save");
        }
    }
}