const btnsViewMap = document.querySelectorAll('.live-cam-button') as NodeListOf<HTMLButtonElement>;
const modal = document.getElementById('modal-map') as HTMLElement;
const closeBtn = document.getElementById('closeMap') as HTMLButtonElement;
import pandaIcon from '/assets/icons/location/panda-loc.svg';

let map: google.maps.Map | null = null;
const position = { lat: -34.397, lng: 150.644 };

function initMap() {
  const mapDiv = document.getElementById('map');

  if (!mapDiv) return;

  map = new google.maps.Map(mapDiv, {
    center: position,
    zoom: 8,
  });

  new google.maps.Marker({
    position,
    map,
    icon: {
    url: pandaIcon,
    scaledSize: new google.maps.Size(80, 80),
    },
  });
}

function openModal() {
  if (!modal) return;

  modal.style.visibility = 'visible';
  modal.style.opacity = '1';

  setTimeout(() => {
    initMap();

    if (!map) return;

    google.maps.event.trigger(map, 'resize');
    map.setCenter(position);
  }, 100);
}

function closeModal() {
  if (!modal) return;
  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';
}

btnsViewMap.forEach(btn => {
  btn.addEventListener('click', openModal);
});

closeBtn?.addEventListener('click', closeModal);