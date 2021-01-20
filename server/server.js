var PROTO_PATH =
  __dirname +
  "/plugintemplate.proto";

var grpc = require('@grpc/grpc-js');
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// corresponds to the package name in the .proto file
var template = protoDescriptor.template;

/**
 * Service implementation
 */
/**
 * @param {!Object} call
 * @param {function():?} callback
 */
function doRenderCore(call, callback) {
  console.log("Hello")
}

/**
 * Get a new server with the handler functions in this file bound to the
 * methods it serves.
 * @return {!Server} The new server object
 */
function getServer() {
  var server = new grpc.Server();
  server.addService(template.PluginTemplateService.service, {
    RenderCore: doRenderCore
  });
  return server;
}

if (require.main === module) {
  var templateServer = getServer();
  templateServer.bindAsync(
    '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
      templateServer.start();
  });
  console.log("Server running on 0.0.0.0:9090")
}

exports.getServer = getServer;
