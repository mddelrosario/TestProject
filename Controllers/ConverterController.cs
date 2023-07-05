using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Text;

namespace TextConverter.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConverterController : ControllerBase
    {   
        [HttpGet("{text}")]
        public async Task<string> Get(string text)
        {
            // Generate a random delay of 1-5 seconds.
            var delay = new Random().Next(1, 5);
            Thread.Sleep(delay * 1000);

            // Encode the text into base64.
            return  Convert.ToBase64String(Encoding.UTF8.GetBytes(text)).ToString();

         
        }
    }
}
