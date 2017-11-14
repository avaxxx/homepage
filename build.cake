#addin "Cake.Yarn"

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Debug");

///////////////////////////////////////////////////////////////////////////////
// SETUP / TEARDOWN
///////////////////////////////////////////////////////////////////////////////

Setup(ctx =>
{
   // Executed BEFORE the first task.
   Information($"Running tasks for {configuration}...");
});

Teardown(ctx =>
{
   // Executed AFTER the last task.
   Information($"Finished running tasks.");
});

///////////////////////////////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////////////////////////////


Task("Restore")
  .Does(() =>
{
    DotNetCoreRestore("./");
});

Task("Build")
    .IsDependentOn("Restore")
  .Does(() =>
{
    DotNetCoreBuild("./");
});

Task("YarnBuild").IsDependentOn("Build")
.Does(() =>
{
    Yarn.Install();
    Yarn.RunScript("webpack:dev");
});

Task("Default").IsDependentOn("YarnBuild");

RunTarget(target);