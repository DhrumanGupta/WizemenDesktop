using System;
using System.IO;

namespace WizemenDesktop.Services
{
    public class Base64FileService : IFileService
    {
        private readonly string _path;

        public Base64FileService()
        {
            var localPath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

            if (string.IsNullOrWhiteSpace(localPath))
                localPath = "/";

            _path = Path.Combine(localPath, "WizemenDesktop");
            if (!Directory.Exists(_path))
            {
                Directory.CreateDirectory(_path);
            }
        }

        public void SaveData(string fileName, string data)
        {
            var fullPath = Path.Combine(_path, fileName);
            if (File.Exists(fullPath)) File.Delete(fullPath);
            File.WriteAllText(fullPath, ToBase64(data));
        }

        public string GetData(string fileName)
        {
            var fullPath = Path.Combine(_path, fileName);
            return !File.Exists(fullPath) ? string.Empty : FromBase64(File.ReadAllText(fullPath));
        }

        public void DeleteData(string fileName)
        {
            var fullPath = Path.Combine(_path, fileName);
            if (File.Exists(fullPath)) File.Delete(fullPath);
        }

        private static string ToBase64(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            try
            {
                var data = Convert.ToBase64String(plainTextBytes);
                return data;
            }
            catch
            {
                return string.Empty;
            }
        }

        private static string FromBase64(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            try
            {
                var data = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                return data;
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}