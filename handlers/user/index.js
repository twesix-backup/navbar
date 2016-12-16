var user={
    change_email:require('./lib/change_email'),
    change_password:require('./lib/change_password'),
    change_phone:require('./lib/change_phone'),
    change_username:require('./lib/change_username'),
    get_info:require('./lib/get_info'),
    used:require('./lib/used'),
    login:require('./lib/login'),
    register:require('./lib/register'),
    set_account:require('./lib/set_account'),

    qq:require('./qq'),
};

module.exports=user;