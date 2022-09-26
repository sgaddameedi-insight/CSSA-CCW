using Newtonsoft.Json;

namespace CCW.UserProfile.Models;

public class User
{
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("email")]
    public string Email { get; set; }
}