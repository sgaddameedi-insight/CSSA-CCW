using Newtonsoft.Json;

namespace CCW.CosmosDb.Seed.Model;

internal class OtherModel
{
    [JsonProperty("id")]
    public string Id { get; set; }
    [JsonProperty("something")]
    public string Something { get; set; }
}