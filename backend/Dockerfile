FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /src

COPY Client/Client.csproj Client/
RUN dotnet restore Client/Client.csproj

COPY Client/ Client/
RUN dotnet publish Client/Client.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS runtime
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:${PORT:-7180}
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 7180

ENTRYPOINT ["dotnet", "Client.dll"]

