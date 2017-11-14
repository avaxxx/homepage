using System.Threading.Tasks;

namespace HomePage.Web.IdentityServer.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
