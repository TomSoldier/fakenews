$MigrationName = Read-Host "Enter a migration name";
dotnet ef migrations add "$MigrationName" --startup-project ..\FakeNews.Api\