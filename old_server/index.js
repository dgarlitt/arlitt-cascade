var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");



var handle = {}
handle["/"] = requestHandlers.index;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/states"] = requestHandlers.getStates;
handle["/counties"] = requestHandlers.getCounties;
handle["/cities"] = requestHandlers.getCities;
handle["/people"] = requestHandlers.getPeople;

server.start(router.route, handle)