namespace WizemenDesktop.Services
{
    public interface IFileService
    {
        void SaveData(string fileName, string data);

        string GetData(string fileName);

        void DeleteData(string fileName);
    }
}