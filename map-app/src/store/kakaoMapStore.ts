import { GEOLocation } from "src/interfaces/common";
import { create } from "zustand";


interface KakaoMapState {
  isLoading: boolean;
  map: kakao.maps.Map | null;
  markers: kakao.maps.Marker[];
  createMap: (mapId: string, location: GEOLocation) => void;
  createMarker: (latlng: kakao.maps.LatLng) => kakao.maps.Marker;
  clearMarker: () => void;
}

const initialStore = {
  isLoading: false,
  map: null,
  markers: [],
}

export const kakaoMapStore = create<KakaoMapState>((set, get) =>({
		...initialStore,
    createMap: async (mapId, location) => {
      const kakao = window.kakao;
      if (!kakao) {
        console.log(kakao)
        return;
      }

      const container = document.getElementById(mapId);
      if(container === null) {
        return;
      }

      set({isLoading: true});
      const center = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );

      const mapOptions = {
        center,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, mapOptions);
      set({isLoading: false, map});

      const {createMarker} = get();
      const marker = createMarker(map.getCenter());
      set({markers: [marker]});

      window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: kakao.maps.event.MouseEvent) {
        const marker = createMarker(mouseEvent.latLng);
        set(({markers}) => {
          return {
            markers: [...markers, marker]
          }
        })

        console.log(`위도: ${mouseEvent.latLng.getLat()}, 경도: ${mouseEvent.latLng.getLng()}`)
      })
    },
    createMarker: (latlng) => {
      const {map} = get();

      const marker = new window.kakao.maps.Marker({
        position: latlng
      });

      marker.setMap(map);
      marker.setDraggable(true);
      return marker;
    },
    clearMarker: () => {
      const {map, createMarker, markers} = get();

      markers.forEach(marker => {
        marker.setMap(null);
      });

      const newMarkers: kakao.maps.Marker[] = [];
      const position = map?.getCenter();
      if (position) {
        const marker = createMarker(position);
        newMarkers.push(marker);
      }



      set({markers});
    }
	})
);
