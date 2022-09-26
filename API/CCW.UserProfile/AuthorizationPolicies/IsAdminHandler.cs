using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace CCW.UserProfile.AuthorizationPolicies;

public class IsAdminHandler : AuthorizationHandler<AdminRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminRequirement requirement)
    {
        //if (context.User == null || !context.User.Identity.IsAuthenticated)
        //{
        //    context.Fail();
        //    return Task.CompletedTask;
        //}

        //var hasClaim = context.User.Claims.Any(x => x.Type == requirement.ClaimType);

        //if (hasClaim)
        //{
        //    context.Succeed(requirement);
        //    return Task.CompletedTask;
        //}

        //context.Fail();
        //return Task.CompletedTask;

        if (context.User.HasClaim(f => f.Type == "Admin"))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
