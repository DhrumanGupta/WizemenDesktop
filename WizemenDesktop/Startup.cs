using System.Threading.Tasks;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WizemenDesktop.Services;

namespace WizemenDesktop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddScoped<IFileService, Base64FileService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            if (HybridSupport.IsElectronActive)
            {
                ElectronBootstrap();
            }
        }

        private static async void ElectronBootstrap()
        {
            var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                MinWidth = 1080,
                MinHeight = 720,
                Show = false,
                Frame = false,
                Icon = "Assets/icon",
            });
            
            await browserWindow.WebContents.Session.ClearCacheAsync();
            browserWindow.RemoveMenu();
            browserWindow.WebContents.OnCrashed += async (killed) =>
            {
                var options = new MessageBoxOptions("This process has crashed.")
                {
                    Type = MessageBoxType.info,
                    Title = "Renderer Process Crashed",
                    Buttons = new[] {"Reload", "Close"}
                };
                var result = await Electron.Dialog.ShowMessageBoxAsync(options);

                if (result.Response == 0)
                {
                    browserWindow.Reload();
                }
                else
                {
                    browserWindow.Close();
                }
            };


            browserWindow.OnReadyToShow += () =>
            {
                browserWindow.Show();
                browserWindow.Focus();
            };
            
            browserWindow.OnClose += () => Electron.App.Quit();

            Electron.IpcMain.On("minimize", (args) => { browserWindow.Minimize(); });

            Electron.IpcMain.On("toggle-fullscreen", async (args) =>
            {
                var fullscreen = await browserWindow.IsMaximizedAsync();
                if (fullscreen) browserWindow.Unmaximize();
                else browserWindow.Maximize();
            });

            Electron.IpcMain.On("quit", (args) => { browserWindow.Close(); });
            
            Electron.IpcMain.On("open-link", async (args) =>
            {
                await Electron.Shell.OpenExternalAsync(args.ToString());
            });
        }
    }
}