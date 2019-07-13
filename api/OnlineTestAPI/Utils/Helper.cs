using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace OnlineTestAPI.Utils
{
    public class Helper
    {
        public static readonly string appkey = "0rLERfB8q7OJ6wdCX8YZ";
        public static readonly string issuer = "api.com";
        public static string GenHash(string input)
        {
            return string.Join("", new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(input)).Select(x => x.ToString("X2")).ToArray());
        }
        public static string GetBaseUrl(HttpRequest req)
        {
            return req.Scheme + "://" + req.Host.ToString();
        }

    }
}
