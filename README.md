## buckler
The poor man's shield

# What is it?
Buckler is a really simple security layer for elasticsearch.

# What does it do?
It simply forwards all requests to the desired elasticsearch cluster, but requires a Basic Authorization header to fulfill the requests.

# How to?
1. Configure you ES firewall to only accept requests from the machine running buckler.
2. Edit the config.js file with the port the server will run and the ES address, OR inject them as environment variables (PORT, ELASTICSEARCH)
3. Edit the allowedClients.js file, so that it exports the allowed username/password combinations.
4. npm install
5. npm start