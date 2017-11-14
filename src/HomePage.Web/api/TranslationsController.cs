using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Resources;
using HomePage.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HomePage.Web.Api
 {
    [Route("api/[controller]")]
    public class TranslationsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(string language)
        {
            string lng = Translations.ConvertLanguage(language);

            var rm = new ResourceManager(typeof(HomePage.Web.Resources.Resource));

            var culture = new CultureInfo(lng);
            var resourceSet = rm.GetResourceSet(culture, true, true);

            var resourceDictionary = resourceSet.Cast<DictionaryEntry>()
                                .ToDictionary(r => r.Key.ToString(),
                                              r => r.Value.ToString());

            return new JsonResult(resourceDictionary);
        }

       
    }
 }
 
