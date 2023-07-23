"use client"

import { Suspense, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { GEOLocation } from "src/interfaces/common";
import Script from "next/script";
import { kakaoMapStore } from "src/store/kakaoMapStore";

export function KakaoMap({kakaoApiKey}:{kakaoApiKey: string}){
  const [location, setLocation] = useState<GEOLocation>({
    latitude: 0,
    longitude: 0
  });

  const {isLoading, createMap} = kakaoMapStore()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        const { latitude, longitude } = position.coords;

        setLocation({
          latitude,
          longitude,
        });
      });
    } 
  }, [])

  useEffect(() => {
    createMap("kakao-map", location);
  }, [location]);

  return <>
    <Script
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`}
      strategy="afterInteractive"
    />
    <div id="kakao-map" className="min-h-[500px] h-full w-full !bg-white"/>
  </>
  
}
