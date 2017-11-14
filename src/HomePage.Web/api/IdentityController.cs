using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HomePage.Web.Api
 {
    [Route("api/[controller]")]
    [ApiAuthorize]
    public class IdentityController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {

            // return new JsonResult("Test");
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }
    }
 }
 
