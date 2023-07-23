import Image from 'next/image'
import Script from 'next/script'
import { Suspense } from 'react'
import { KakaoMap } from 'src/components/map.client'
import { kakaoMapStore } from 'src/store/kakaoMapStore'


export default function Home() {
  // rome-ignore lint/style/noNonNullAssertion: 반드시 존재 해야 함.
const  kakaoApiKey = process.env.KAKAO_JS_API_KEY!;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-full items-stretch">
      <KakaoMap kakaoApiKey={kakaoApiKey} />
    </main>
  )
}
