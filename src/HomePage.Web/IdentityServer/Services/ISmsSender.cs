using System.Threading.Tasks;

namespace HomePage.Web.IdentityServer.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
