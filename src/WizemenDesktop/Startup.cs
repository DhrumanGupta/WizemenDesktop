using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Threading.Tasks;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
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
                ElectronBootstrap(env);
            }
        }

        private static async void ElectronBootstrap(IHostEnvironment env)
        {
            var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                MinWidth = 1080,
                MinHeight = 720,
                Show = false,
                Frame = false,
                Icon = "Assets/icon",
                WebPreferences = new WebPreferences
                {
                    ZoomFactor = 1,
                    Webaudio = false,
                    Webgl = false,
                    ScrollBounce = true,
                    DevTools = false
                }
            });

            await browserWindow.WebContents.Session.ClearCacheAsync();
            browserWindow.RemoveMenu();
            browserWindow.WebContents.OnCrashed += async _ =>
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


            browserWindow.OnReadyToShow += async () =>
            {
                browserWindow.Show();
                browserWindow.Focus();
                Electron.App.SetAppUserModelId("Wizemen Desktop");
            };

            browserWindow.OnClose += () => Electron.App.Quit();
            Electron.App.WillQuit += _ => Task.Run(() => Electron.GlobalShortcut.UnregisterAll());

            AttachIpcListeners(browserWindow, env);
        }

        private static void AttachIpcListeners(BrowserWindow browserWindow, IHostEnvironment env)
        {
            Electron.IpcMain.On("minimize", _ => { browserWindow.Minimize(); });

            Electron.IpcMain.On("toggle-fullscreen", async _ =>
            {
                var fullscreen = await browserWindow.IsMaximizedAsync();
                if (fullscreen) browserWindow.Unmaximize();
                else browserWindow.Maximize();
            });

            Electron.IpcMain.On("quit", _ => { browserWindow.Close(); });

            Electron.IpcMain.On("open-link",
                async args => { await Electron.Shell.OpenExternalAsync(args.ToString()); });

            Electron.IpcMain.On("notification",
                args =>
                {
                    var data = JObject.FromObject(args);

                    if (!data.TryGetValue("title", StringComparison.InvariantCultureIgnoreCase, out var title)
                        || !data.TryGetValue("content", StringComparison.InvariantCultureIgnoreCase,
                            out var content)) return;

                    var notification = new NotificationOptions(title.ToString(), content.ToString())
                    {
                        Icon = Path.Combine(env.ContentRootPath, "Assets/icon.png")
                    };

                    var link = data.GetValue("link");
                    if (link != null)
                    {
                        notification.OnClick = async () => await Electron.Shell.OpenExternalAsync(link.ToString());
                    }

                    Electron.Notification.Show(notification);
                });
        }
    }
}