using Newtonsoft.Json;

namespace CCW.CosmosDb.Seed.Model;

public class Root
{
    [JsonProperty("database")]
    public string database { get; set; }
    [JsonProperty("container")]
    public string container { get; set; }
    [JsonProperty("recordType")]
    public string RecordType { get; set; }
    [JsonProperty("partitionKey")]
    public string PartitionKey { get; set; }
    [JsonProperty("items")]
    public List<dynamic> Items { get; set; }
}