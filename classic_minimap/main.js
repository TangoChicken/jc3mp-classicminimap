const config = require("./config.json");
function setUp(){
    let up = isNaN(config.ui_position)?0:config.ui_position<0?0:config.ui_position>4?0:config.ui_position;
    let us = isNaN(config.ui_scale)?0:config.ui_position<0?0:config.ui_position>1?0:config.ui_position;
    let th = isNaN(config.update_health)?250:config.update_health<1?250:config.update_health;
    let tp = isNaN(config.update_pos)?100:config.update_pos<1?100:config.update_pos;
    return {"up":up,"us":us,"th":th,"tp":tp};
}

const conf = setUp();
jcmp.events.AddRemoteCallable('cmm_rmt_setup', player => {
    jcmp.events.CallRemote('cmm_lcl_setup', player, JSON.stringify(conf));
});

jcmp.events.AddRemoteCallable('cmm_rmt_healthupdate', player => {
    jcmp.events.CallRemote('cmm_lcl_healthupdate', player, player.health);
});
