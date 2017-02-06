let vars={};
global.vars=vars;
vars.db=require('db').mysql;

require('./express_framework/lib/http_server');