using Microsoft.AspNetCore.Localization;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
 
namespace HomePage.Web.Helpers
{
    public class Translations 
    {
        public static string ConvertLanguage(string language)
        {
            switch (language)
            {
                case "en":
                    return "en-US";
                case "fr":
                    return "fr-FR";
                default:
                    return "en-US";
            }
        }
    }
}