using Newtonsoft.Json;

namespace CCW.CosmosDb.Seed.Model;

public class UserModel
{
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("email")]
    public string Email { get; set; }
}