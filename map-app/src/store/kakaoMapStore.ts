import { GEOLocation } from "src/interfaces/common";
import { create } from "zustand";

interface KakaoMapState {
  kakao: any;
  isLoading: boolean;
  createMap: (mapId: string, location: GEOLocation) => void;
}

const initialStore = {
  kakao: null,
  isLoading: false,
}

export const kakaoMapStore = create<KakaoMapState>((set, get) =>({
		...initialStore,
    createMap: async (mapId, location) => {
      const kakao = window.kakao;

      if (!kakao) {
        console.log(kakao)
        return;
      }

      set({isLoading: true});
      window.kakao.maps.load(() => {
        const container = document.getElementById(mapId);
        const center = new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        );
  
        const mapOptions = {
          center,
          level: 3,
        };
  
        new window.kakao.maps.Map(container, mapOptions);
      })
      set({isLoading: false});
    }
	})
);
