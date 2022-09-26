
using Microsoft.Azure.Cosmos;
using Container = Microsoft.Azure.Cosmos.Container;
using User = CCW.UserProfile.Models.User;

namespace CCW.UserProfile.Services;

public class CosmosDbService : ICosmosDbService
{
    private Container _container;

    public CosmosDbService(
        CosmosClient cosmosDbClient,
        string databaseName,
        string containerName)
    {
        _container = cosmosDbClient.GetContainer(databaseName, containerName);
    }

    public async Task<User> AddAsync(User user)
    {
        try
        {
           User createdItem =   await _container.CreateItemAsync(user, new PartitionKey(user.Id));
           return createdItem;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task DeleteAsync(string id)
    {
        await _container.DeleteItemAsync<User>(id, new PartitionKey(id));
    }

    //public async Task<User> GetAsync(string id)
    //{
    //    try
    //    {
    //        var response = await _container.ReadItemAsync<User>(id, new PartitionKey(id));

    //        return response.Resource;
    //    }
    //    catch (CosmosException)
    //    {
    //        return null!;
    //    }
    //}

    public async Task<User> GetAsync(string email)
    {
        try
        {
            // Build query definition
            var parameterizedQuery = new QueryDefinition(
                query: "SELECT * FROM users p WHERE p.email = @email"
            )
                .WithParameter("@email", email);


            // Query multiple items from container
            using FeedIterator<User> filteredFeed = _container.GetItemQueryIterator<User>(
                queryDefinition: parameterizedQuery
            );

            // Iterate query result pages
            if(filteredFeed.HasMoreResults)
            {
                FeedResponse<User> response = await filteredFeed.ReadNextAsync();

                var user = response.Select(u => new User
                {
                    Id = u.Id,
                    Email = u.Email
                }).First();

                return user;
            }

            return null!;
        }
        catch (CosmosException)
        {
            return null!;
        }
    }

    public async Task<IEnumerable<User>> GetMultipleAsync(string queryString)
    {
        var query = _container.GetItemQueryIterator<User>(new QueryDefinition(queryString));
        var results = new List<User>();
        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            results.AddRange(response.ToList());
        }
        return results;
    }

    public async Task UpdateAsync(string id, User user)
    {
        await _container.UpsertItemAsync(user, new PartitionKey(id));
    }
}

