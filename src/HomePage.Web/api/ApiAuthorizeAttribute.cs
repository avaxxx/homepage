using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HomePage.Web.Api
{
    public class ApiAuthorizeAttribute : TypeFilterAttribute
    {
        public ApiAuthorizeAttribute() : base(typeof(ApiAuthorizeFilter))
        {
        }
        
    }
    public class ApiAuthorizeFilter : IAuthorizationFilter
    {
        public void  OnAuthorization(AuthorizationFilterContext context)
        {
            var identity = context.HttpContext.User.Identity;
            if (!identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}