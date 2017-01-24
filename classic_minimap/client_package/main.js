const ui = new WebUIWindow('cmap_ui', 'package://classic_minimap/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
var lastPos = "";
ui.autoResize = true;

jcmp.events.AddRemoteCallable('cmm_lcl_setup', (s) => {
	jcmp.ui.CallEvent('cmm_setup', s);
});

jcmp.events.Add('GameTeleportCompleted', () => {
	jcmp.events.CallRemote('cmm_rmt_setup');
});

jcmp.ui.AddEvent('cmm_rposupdate', x => {
	let pos = JSON.stringify([(-(jcmp.localPlayer.position.z / 100)), (jcmp.localPlayer.position.x / 100)]);
	if(pos != lastPos){
  	jcmp.ui.CallEvent('cmm_posupdate',pos);
	}
	lastPos = pos;
});

jcmp.ui.AddEvent('cmm_rhealthupdate', x => {
  jcmp.events.CallRemote('cmm_rmt_healthupdate');
});

jcmp.events.AddRemoteCallable('cmm_lcl_healthupdate', (h) => {
	jcmp.ui.CallEvent('cmm_healthupdate',h/800); //Placeholder, 800 is default health
});
