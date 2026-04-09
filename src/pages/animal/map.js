const btnsViewMap = document.querySelectorAll('.live-cam-button');
const modal = document.getElementById('modal-map');
const closeBtn = document.getElementById('closeMap');

let map = null;
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
    url: '/assets/icons/location/panda-loc.svg',
    scaledSize: new google.maps.Size(80, 80),
    },
  });
}

function openModal() {
  if (!modal) return;

  modal.style.visibility = 'visible';
  modal.style.opacity = 1;

  setTimeout(() => {
    initMap();

    google.maps.event.trigger(map, 'resize');
    map.setCenter(position);
  }, 100);
}

function closeModal() {
  if (!modal) return;
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
}

btnsViewMap.forEach(btn => {
  btn.addEventListener('click', openModal);
});

closeBtn?.addEventListener('click', closeModal);