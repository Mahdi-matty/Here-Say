// Initialize and add the map
let map;

async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const map = new Map(document.getElementById("map"), {
    center: { lat: 37.39094933041195, lng: -122.02503913145092 },
    zoom: 14,
    mapId: "4504f8b37365c3d0",
  });
  const infoWindow = new InfoWindow();
  const draggableMarker = new AdvancedMarkerElement({
    map,
    position: { lat: 37.39094933041195, lng: -122.02503913145092 },
    gmpDraggable: true,
    title: "This marker is draggable.",
  });

  draggableMarker.addListener("dragend", (event) => {
    const position = draggableMarker.position;

    infoWindow.close();
    infoWindow.setContent(
      `Pin dropped at: ${position.lat()}, ${position.lng()}`,
    );
    infoWindow.open(draggableMarker.map, draggableMarker);
  });
}


  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyAw-eYDjESg87GqCwHKYunuN8jONSNI3q4",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });

initMap();

