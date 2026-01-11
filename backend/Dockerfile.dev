FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine
WORKDIR /app
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 7180
ENTRYPOINT ["/entrypoint.sh"]
