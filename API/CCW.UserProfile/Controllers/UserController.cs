
using CCW.UserProfile.Services;
using Microsoft.AspNetCore.Mvc;
using User = CCW.UserProfile.Models.User;

namespace CCW.UserProfile.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class UserController : ControllerBase
{
    private readonly ICosmosDbService _cosmosDbService;

    private readonly ILogger<UserController> _logger;

    public UserController(ICosmosDbService cosmosDbService, ILogger<UserController> logger)
    {
        _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
        _logger = logger;
    }

    [HttpGet("{userEmail}")]
    public async Task<IActionResult> Get(string userEmail)
    {
        return Ok(await _cosmosDbService.GetAsync(userEmail));
    }

    [Route("{userEmail}/validate")]
    [HttpPost]
    public void Post()
    {
        throw new NotImplementedException(); 
    }

    [Route("create")]
    [HttpPut]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        return Ok(await _cosmosDbService.AddAsync(user));
    }

    [Route("{id}/delete")]
    [HttpDelete]
    public async Task<IActionResult> Delete(string id)
    {
        await _cosmosDbService.DeleteAsync(id);
        return NoContent();
    }
}
