namespace WizemenDesktop.Services
{
    public interface IFileService
    {
        void SaveData(string path, string data);

        string GetData(string path);
    }
}